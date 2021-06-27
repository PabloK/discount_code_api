import { GraphQLScalarType, Kind } from 'graphql';

export const SCALARS = {
  DATE_SCALAR: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type using EPOCH format',
    serialize(value) {
      return value;
    },
    parseValue(value) {
      return new Date(value);
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(parseInt(ast.value, 10));
      }
      return null;
    },
  }),
};
