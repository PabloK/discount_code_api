import 'reflect-metadata';

import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';
import { addResolversToSchema } from '@graphql-tools/schema';
import { ApolloServer } from 'apollo-server-azure-functions';
import * as path from 'path';
import Container from 'typedi';

import { Resolvers } from '../src/types/graphql-types';
import { DiscountCodesResolver } from './resolvers/discountcode.resolver';
import { MutationCreateDiscountCodesArgs } from './types/graphql-types';

const schema = loadSchemaSync(path.join('graphql', 'schema.graphqls'), {
  loaders: [new GraphQLFileLoader()]
});

const discountCodeResolver = Container.get(DiscountCodesResolver);

const resolvers: Resolvers = {
    Query: {},
    Mutation: {
        createDiscountCodes: async (parent: unknown, args: MutationCreateDiscountCodesArgs, {context}) => {
            return discountCodeResolver.createDiscountCodes(args, context);
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
