"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      Booking.belongsTo(models.User);
      Booking.belongsTo(models.Spot);
    }
  }
  Booking.init(
    {
      spotId: { type: DataTypes.INTEGER, allowNull: false },
      userId: { type: DataTypes.INTEGER, allowNull: false },
      startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          isBeforeEndDate(value) {
            if (value > this.endDate) {
              throw new Error("Start date must be before end date");
            }
          },
        },
      },
      endDate: { type: DataTypes.DATEONLY, allowNull: false },
    },
    {
      sequelize,
      modelName: "Booking",
    }
  );
  return Booking;
};
