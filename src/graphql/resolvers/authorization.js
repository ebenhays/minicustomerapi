const {ForbiddenError} = require('apollo-server');
const {skip} = require('graphql-resolvers');

exports.isAuthenticated = (parent, args, {token}) =>
  token ? skip : new ForbiddenError('Forbidden');
