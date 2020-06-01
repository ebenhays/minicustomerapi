const {gql} = require('apollo-server-express');

module.exports = gql`
  type Query {
    getServices: [Service]
    getService(id: ID!): Service
  }

  type Service {
    id: ID!
    servicename: String
  }

  type Mutation {
    addService(servicename: String!): Service
  }
`;
