"use strict";

let schema;
if (process.env.NODE_ENV === "production" && process.env.SCHEMA) {
  schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    console.log("Started adding columns...");
    await queryInterface.addColumn(
      { tableName: "Bookings", schema },
      "spotId",
      {
        type: Sequelize.INTEGER,
        references: { model: "Spots", key: "id" },
        onUpdate: "cascade",
        onDelete: "cascade",
      }
    );
    console.log("Column added for bookings (spots)...");
    await queryInterface.addColumn(
      { tableName: "Bookings", schema },
      "userId",
      {
        type: Sequelize.INTEGER,
        references: { model: "Users", key: "id" },
        onUpdate: "cascade",
        onDelete: "cascade",
      }
    );
    console.log("Column added for bookings (userId)...");
    await queryInterface.addColumn(
      { tableName: "Spots", schema },
      "ownerId",
      {
        type: Sequelize.INTEGER,
        references: { model: "Users", key: "id" },
        onUpdate: "cascade",
        onDelete: "cascade",
      }
    );
    console.log("Column added for Spots (ownerId)...");
    await queryInterface.addColumn(
      { tableName: "SpotImages", schema },
      "spotId",
      {
        type: Sequelize.INTEGER,
        references: { model: "Spots", key: "id" },
        onUpdate: "cascade",
        onDelete: "cascade",
      }
    );
    console.log("Column added for SpotImages ...");
    await queryInterface.addColumn(
      { tableName: "Reviews", schema },
      "spotId",
      {
        type: Sequelize.INTEGER,
        references: { model: "Spots", key: "id" },
        onUpdate: "cascade",
        onDelete: "cascade",
      }
    );
    console.log("Column added for Reviews (spotId)...");
    await queryInterface.addColumn(
      { tableName: "Reviews", schema },
      "userId",
      {
        type: Sequelize.INTEGER,
        references: { model: "Users", key: "id" },
        onDelete: "cascade",
        onUpdate: "cascade",
      }
    );
    console.log("Column added for Reviews (userId)...");
    await queryInterface.addColumn(
      { tableName: "ReviewImages", schema },
      "reviewId",
      {
        type: Sequelize.INTEGER,
        references: { model: "Reviews", key: "id" },
        onDelete: "cascade",
        onUpdate: "cascade",
      }
    );
    console.log("Column added for ReviewImages...");
    console.log("Finished adding columns (～￣▽￣)～");
  },

  async down(queryInterface) {
    await queryInterface.removeColumn(
      { tableName: "Bookings", schema },
      "spotId"
    );
    await queryInterface.removeColumn(
      { tableName: "Bookings", schema },
      "userId"
    );
    await queryInterface.removeColumn(
      { tableName: "Spots", schema },
      "ownerId"
    );
    await queryInterface.removeColumn(
      { tableName: "SpotImages", schema },
      "spotId"
    );
    await queryInterface.removeColumn(
      { tableName: "Reviews", schema },
      "spotId"
    );
    await queryInterface.removeColumn(
      { tableName: "Reviews", schema },
      "userId"
    );
    await queryInterface.removeColumn(
      { tableName: "ReviewImages", schema },
      "reviewId"
    );
  },
};
