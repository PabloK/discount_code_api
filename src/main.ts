import 'reflect-metadata';

import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';
import { addResolversToSchema } from '@graphql-tools/schema';
import { ApolloServer } from 'apollo-server-azure-functions';
import * as path from 'path';
import Container from 'typedi';

import { Resolvers } from '../src/types/graphql-types';
import { DiscountCodeResolver } from './resolvers/discountcode.resolver';
import { CreateDiscountCodesResponse, MutationCreateDiscountCodesArgs } from './types/graphql-types';

const schema = loadSchemaSync(path.join('graphql', 'schema.graphqls'), {
  loaders: [new GraphQLFileLoader()]
});

const discountCodeResolver = Container.get(DiscountCodeResolver);

const resolvers: Resolvers = {
    Query: {},
    Mutation: {
        createDiscountCodes: async (parent: unknown, args: MutationCreateDiscountCodesArgs, { context }) => {
            const response = await discountCodeResolver.createDiscountCodes(args, context);
            context.discuntCodesToPersist = response
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
    context: c => ({ context: c.context }) }
);

export const graphqlHandler = server.createHandler();
