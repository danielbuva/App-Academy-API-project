"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    static associate(models) {
      Spot.belongsToMany(models.User, {
        through: models.Booking,
        foreignKey: "spotId",
        otherKey: "userId",
      });
      Spot.hasMany(models.Review, {
        foreignKey: "spotId",
        otherKey: "id",
        onDelete: "CASCADE",
        hooks: true,
      });
      Spot.belongsTo(models.User, {
        as: "Owner",
        foreignKey: "ownerId",
        onDelete: "CASCADE",
      });
      Spot.hasMany(models.SpotImage, {
        foreignKey: "spotId",
        otherKey: "id",
      });
    }
  }
  Spot.init(
    {
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      address: { type: DataTypes.STRING, allowNull: false },
      addressNumber: { type: DataTypes.STRING, allowNull: true },
      zipcode: { type: DataTypes.STRING, allowNull: false },
      city: { type: DataTypes.STRING, allowNull: false },
      state: { type: DataTypes.STRING, allowNull: false },
      country: { type: DataTypes.STRING, allowNull: false },
      lat: { type: DataTypes.FLOAT, allowNull: true },
      lng: { type: DataTypes.FLOAT, allowNull: true },
      name: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: false },
      price: { type: DataTypes.FLOAT, allowNull: false },
      type: {
        type: DataTypes.ENUM,
        allowNull: false,
        defaultValue: "House",
        values: [
          "House",
          "Apartment",
          "Barn",
          "Bed & breakfast",
          "Boat",
          "Cabin",
          "Camper/RV",
          "Casa particular",
          "Castle",
          "Cave",
          "Container",
          "Cycladic home",
          "Dammuso",
          "Dome",
          "Earth home",
          "Farm",
          "Guesthouse",
          "Hotel",
          "Houseboat",
          "Kezhan",
          "Minsu",
          "Riad",
          "Ryokan",
          "Shepherd's hut",
          "Tent",
          "Tiny home",
          "Tower",
          "Treehouse",
          "Trulio",
          "Windmill",
          "Yurt",
        ],
      },
      place: {
        type: DataTypes.ENUM,
        allowNull: false,
        defaultValue: "An entire place",
        values: ["An entire place", "A room", "A shared room"],
      },
    },
    {
      sequelize,
      modelName: "Spot",
    }
  );
  return Spot;
};
