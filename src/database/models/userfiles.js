"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserFiles = sequelize.define(
    "UserFiles",
    {
      ticketNo: DataTypes.STRING,
      datafile: DataTypes.STRING,
      orgfilename: DataTypes.STRING,
      mimetype: DataTypes.STRING,
    },
    {}
  );
  UserFiles.associate = function (models) {
    // associations can be defined here
  };
  return UserFiles;
};
