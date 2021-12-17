const { graphql } = require("graphql");
const { makeExecutableSchema } = require("graphql-tools");

const typeDefs = require("./schema/schema");
const resolvers = require("./resolvers/mergeResolvers");

const schema = makeExecutableSchema({ typeDefs, resolvers });

const graphqlTestCall = async (
  query,
  variables,
  employeeId
) => {
  return graphql(
    schema,
    query,
    undefined,
    {
      req: {
        session: {
          employeeId,
          destroy: () => {
            return null;
          }
        }
      },
      res: {
        clearCookie: () => {}
      }
    },
    variables
  );
};

module.exports = { graphqlTestCall }