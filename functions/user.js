const { ApolloServer, gql } = require('apollo-server-lambda');
const fs = require("fs");

const typeDefs = gql(
  fs.readFileSync("schema/user.graphql", { encoding: "utf-8" })
);
const resolvers = require("../resolvers/user");

const server = new ApolloServer({ typeDefs, resolvers });
exports.userHandler = server.createHandler();