import { Context } from '@azure/functions';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';
import { addResolversToSchema } from '@graphql-tools/schema';
import { ApolloServer } from 'apollo-server-azure-functions';
import * as path from 'path';

import { Resolvers } from '../src/types/graphql-types';
import { DiscountCode, DiscountCodesResponse } from './types/graphql-types';

const schema = loadSchemaSync(path.join('graphql', 'schema.graphqls'), {
  loaders: [new GraphQLFileLoader()]
});

const resolvers: Resolvers = {
    Query: {},
    Mutation: {
        createDiscountCodes: (parent: unknown, args: unknown, context: Context) => {
            return {
                discountCodes: {
                    discountCodes: [
                        {
                            id: "1"
                        } as DiscountCode
            ]}} as DiscountCodesResponse
        }
    }
};

const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers
});

const server = new ApolloServer({
  schema: schemaWithResolvers
});

export const graphqlHandler = server.createHandler();
