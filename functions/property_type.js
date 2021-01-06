const { ApolloServer, gql } = require("apollo-server-lambda");
const fs = require("fs");

const typeDefs = gql(
  fs.readFileSync("schema/property_type.graphql", { encoding: "utf-8" })
);
const resolvers = require("../resolvers/property_type");

const server = new ApolloServer({ typeDefs, resolvers });
exports.property_typeHandler = server.createHandler();
