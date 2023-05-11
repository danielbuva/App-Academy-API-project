"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    static associate(models) {
      Spot.belongsToMany(models.Users, { through: models.Bookings });
      Spot.hasMany(models.Reviews);
      Spot.belongsTo(models.Users, { foreignKey: "ownerId" });
    }
  }
  Spot.init(
    {
      ownerId: { type: DataTypes.INTEGER, allowNull: false },
      address: { type: DataTypes.STRING, allowNull: false },
      city: { type: DataTypes.STRING, allowNull: false },
      state: { type: DataTypes.STRING, allowNull: false },
      country: { type: DataTypes.STRING, allowNull: false },
      lat: { type: DataTypes.FLOAT, allowNull: false },
      lng: { type: DataTypes.FLOAT, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: false },
      price: { type: DataTypes.FLOAT, allowNull: false },
    },
    {
      sequelize,
      modelName: "Spot",
    }
  );
  return Spot;
};
