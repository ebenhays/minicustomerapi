// this is just a function to resolve the type definitions definined in the graphql schema
//const models = require('../../database/models');
const bcrypt = require('bcryptjs');
const {AuthenticationError, UserInputError} = require('apollo-server');
const jwt = require('jsonwebtoken');
const {isAuthenticated} = require('./authorization');
const {combineResolvers} = require('graphql-resolvers');
const Query = {
  getComplaints: combineResolvers(
    isAuthenticated,
    async (parent, args, {modelsn}) => {
      const result = await models.CustomerComplaint.findAll();
      return result;
    }
  ),
  getComplaint: combineResolvers(
    isAuthenticated,
    async (parent, {id}, {models}) => {
      return await models.CustomerComplaint.findOne({where: {id}});
    }
  ),
  getServices: combineResolvers(
    isAuthenticated,
    async (parent, args, {models}) => {
      return await models.Services.findAll();
    }
  ),
  getService: combineResolvers(
    isAuthenticated,
    async (parent, {id}, {models}) => {
      return await models.Services.findOne({where: {id}});
    }
  ),
  getUsers: combineResolvers(
    isAuthenticated,
    async (parent, args, {models}) => {
      return await models.UserProfiles.findAll({});
    }
  ),
  getUser: combineResolvers(
    isAuthenticated,
    async (parent, {username}, {models}) => {
      return await models.UserProfiles.findOne({where: {username}});
    }
  ),
};

CustomerComplaints = {
  service: async (parent, args, {models}) => {
    return await models.Services.findOne({where: {id: parent.serviceId}});
  },
};

Mutation = {
  addService: combineResolvers(
    isAuthenticated,
    async (parent, {servicename}, {models}) => {
      return await models.Services.create({servicename});
    }
  ),
  addComplaint: combineResolvers(
    isAuthenticated,
    async (parent, args, {models}) => {
      const {
        ticketno,
        customername,
        email,
        phoneno,
        message,
        serviceId,
      } = args.input;

      return await models.CustomerComplaint.create({
        ticketno,
        customername,
        email,
        phoneno,
        message,
        serviceId,
      });
    }
  ),

  registerUser: async (parent, args, {models}) => {
    const {username, password, role, isDefault, fullname} = args.input;
    const user = await models.UserProfiles.findOne({where: {username}});
    if (user) throw new Error('User Already Exists');

    return await models.UserProfiles.create({
      username,
      password: await bcrypt.hash(password, 10),
      role,
      IsDefault: isDefault,
      fullname,
    });
  },
  signInUser: async (parent, args, {models, secret}) => {
    const {username, password} = args.input;
    //check if credentials is correct
    //get hashedpassword to compare with
    if (username === null || password === null)
      throw new UserInputError('All Fields are Required');
    const data = await models.UserProfiles.findOne({
      where: {username},
      attributes: ['password', 'username', 'fullname'],
    });

    if (data !== null) {
      const result = await bcrypt.compare(password, data.dataValues.password);
      if (result) {
        const token = jwt.sign({username, password}, secret, {
          expiresIn: '30m',
        });
        return {
          username: data.dataValues.username,
          fullname: data.dataValues.fullname,
          token,
        };
      } else throw new AuthenticationError('Authentication Failed');
    } else
      throw new AuthenticationError(
        'Authentication Failed. Credentials Invalid'
      );
  },
};

module.exports = {
  Query,
  CustomerComplaints,
  Mutation,
};
