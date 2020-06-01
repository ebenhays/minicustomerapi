const {gql} = require('apollo-server-express');

module.exports = gql`
  type Query {
    getComplaints: [CustomerComplaints]
    getComplaint(id: ID!): CustomerComplaints
  }

  type CustomerComplaints {
    id: ID
    customername: String
    email: String
    phoneno: String
    message: String
    service: Service
    status: String
    ticketno: String
    assignedTo: String
    assignedDate: Date
    resolvedDate: Date
    resolvedBy: String
    closedDate: Date
    closedBy: String
    reassignedBy: String
    reassignedDate: Date
    reassignedTo: String
  }

  type Mutation {
    addComplaint(input: AddComplaint): CustomerComplaints
  }

  input AddComplaint {
    ticketno: String!
    customername: String!
    email: String!
    phoneno: String!
    message: String!
    serviceId: Int!
  }
`;
