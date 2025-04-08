const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('./config/db');
const dotenv = require('dotenv');
const typeDefs = require('./schema/schema');
const resolvers = require('./resolvers/resolver');
const cors = require('cors');


dotenv.config();
const app = express();
app.use(cors());

const server = new ApolloServer({ typeDefs, resolvers });

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  app.listen(process.env.PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`);
  });
}

startServer();
