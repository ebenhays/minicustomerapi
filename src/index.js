const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const {ApolloServer, AuthenticationError} = require('apollo-server-express');
const typeDefs = require('./graphql/schema/typedef');
const resolvers = require('./graphql/resolvers/resolvers');
const models = require('../src/database/models');
const jwt = require('jsonwebtoken');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const verifyToken = async (req) => {
  const token = await req.headers['x-token'];
  if (token) {
    try {
      return await jwt.verify(token, process.env.SESSION_SECRET);
    } catch (e) {
      throw new AuthenticationError('Your session expired. Sign in again.');
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({req}) => {
    const token = await verifyToken(req);
    return {
      models,
      secret: process.env.SESSION_SECRET,
      token,
    };
  },
});

server.applyMiddleware({app, path: '/graphql'});

// app.use('/', (req, res) => {
//   res.status(200).send('Welcome Graphql');
// });

app.listen(5000, () => {
  console.log('Server listening on port 5000');
});

// process.on('uncaughtException', (error) => {
//   console.log(error.message);
// });
