const {gql} = require('apollo-server');

module.exports = gql`
  scalar Date
  type Query {
    getComplaints: [CustomerComplaints]
    getComplaint(id: ID!): CustomerComplaints
    getServices: [Service]
    getService(id: ID!): Service
    getUsers: [User!]
    getUser(username: String!): User
  }

  type Service {
    id: ID!
    servicename: String
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

  type User {
    username: String!
    password: String!
    role: String!
    IsDefault: String!
    fullname: String!
    token: String
  }

  type Mutation {
    addService(servicename: String!): Service
    addComplaint(input: AddComplaint!): CustomerComplaints
    registerUser(input: RegisterUser!): User
    signInUser(input: SignIn): User
  }

  input AddComplaint {
    ticketno: String!
    customername: String!
    email: String!
    phoneno: String!
    message: String!
    serviceId: Int!
  }

  input RegisterUser {
    username: String!
    password: String!
    role: String!
    fullname: String!
    isDefault: String!
  }

  input SignIn {
    username: String!
    password: String!
  }
`;
