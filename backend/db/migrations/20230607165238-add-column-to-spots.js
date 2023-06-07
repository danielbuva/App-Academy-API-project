"use strict";

let options = { tableName: "Spots" };
if (process.env.NODE_ENV === "production" && process.env.SCHEMA) {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.addColumn(options, "addressNumber", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    queryInterface.addColumn(options, "zipcode", {
      type: Sequelize.STRING,
      values: ["An entire place", "A room", "A shared room"],
      allowNull: false,
    });
  },

  async down(queryInterface) {
    queryInterface.removeColumn(options, "addressNumber");
    queryInterface.removeColumn(options, "zipcode");
  },
};
