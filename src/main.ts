import 'reflect-metadata';

import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';
import { addResolversToSchema } from '@graphql-tools/schema';
import { ApolloError, ApolloServer } from 'apollo-server-azure-functions';
import * as path from 'path';

import { Resolvers } from '../src/types/graphql-types';
import { CreateDiscountCodesResponse, MutationCreateDiscountCodesArgs } from './types/graphql-types';

const schema = loadSchemaSync(path.join('graphql', 'schema.graphqls'), {
  loaders: [new GraphQLFileLoader()]
});

const resolvers: Resolvers = {
  Query: {},
  Mutation: {
    createDiscountCodes: async (parent: unknown, args: MutationCreateDiscountCodesArgs, { context }) => {
      if (args.codesToCreate < 1 || args.codesToCreate > 10000) {
        throw new ApolloError("Codes to create should be between 1 and 10000");
      }
      if (args.discountPercent < 1 || args.discountPercent > 100) {
        throw new ApolloError("Discount should be between 1 and 100%");
      }
      context.bindings.outputQueueItems = {...args };
      return { created: true } as CreateDiscountCodesResponse
    }
  }
};

const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers
});

const server = new ApolloServer({
  schema: schemaWithResolvers,
  debug: false,
  context: c => ({ context: c.context }) }
);

export const graphqlHandler = server.createHandler();
