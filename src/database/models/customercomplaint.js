const { Services } = require("../models/services");
("use strict");
module.exports = (sequelize, DataTypes) => {
  const CustomerComplaint = sequelize.define(
    "CustomerComplaint",
    {
      customername: DataTypes.STRING,
      email: DataTypes.STRING,
      phoneno: DataTypes.STRING,
      serviceId: {
        type: DataTypes.INTEGER,
        references: {
          model: Services,
          key: "id"
        }
      },
      message: DataTypes.STRING,
      status: {
        type: DataTypes.STRING,
        validate: {
          isIn: [["pending", "assigned", "resolved", "closed"]]
        }
      },
      ticketno: DataTypes.STRING,
      assignedTo: DataTypes.STRING,
      assignedBy: DataTypes.STRING,
      assignedDate: DataTypes.DATE,
      resolvedDate: DataTypes.DATE,
      resolvedBy: DataTypes.STRING,
      closedDate: DataTypes.DATE,
      closedBy: DataTypes.STRING,
      reassignedBy: DataTypes.STRING,
      reassignedDate: DataTypes.DATE,
      reassignedTo: DataTypes.STRING
    },
    {}
  );
  CustomerComplaint.associate = function(models) {
    // associations can be defined here
    CustomerComplaint.belongsTo(models.Services, { foreignKey: "serviceId" });
  };
  return CustomerComplaint;
};
