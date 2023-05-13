"use strict";
require("dotenv").config();

let schema;
if (process.env.NODE_ENV === "production" && process.env.SCHEMA) {
  schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    console.log("Started adding constraints...");
    await queryInterface.addConstraint(
      { tableName: "Bookings", schema },
      {
        type: "foreign key",
        fields: ["spotId"],
        references: {
          table: "Spots",
          field: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
        schema,
      }
    );
    console.log("Constraint added for Bookings (spots)...");
    await queryInterface.addConstraint(
      { tableName: "Bookings", schema },
      {
        type: "foreign key",
        fields: ["userId"],
        references: {
          table: "Users",
          field: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
        schema,
      }
    );
    console.log("Constraint added for Bookings (user)...");
    await queryInterface.addConstraint(
      { tableName: "Spots", schema },
      {
        type: "foreign key",
        fields: ["ownerId"],
        references: {
          table: "Users",
          field: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
        schema,
      }
    );
    console.log("Constraint added for Spots...");
    await queryInterface.addConstraint(
      { tableName: "SpotImages", schema },
      {
        type: "foreign key",
        fields: ["spotId"],
        references: {
          table: "Spots",
          field: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      }
    );
    console.log("Constraint added for SpotImages...");
    await queryInterface.addConstraint(
      { tableName: "Reviews", schema },
      {
        type: "foreign key",
        fields: ["spotId"],
        references: {
          table: "Spots",
          field: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
        schema,
      }
    );
    console.log("Constraint added for Reviews(spots)...");
    await queryInterface.addConstraint(
      { tableName: "Reviews", schema },
      {
        type: "foreign key",
        fields: ["userId"],
        references: {
          table: "Users",
          field: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
        schema,
      }
    );
    console.log("Constraint added for Reviews (event)...");
    await queryInterface.addConstraint(
      { tableName: "ReviewImages", schema },
      {
        type: "foreign key",
        fields: ["reviewId"],
        references: {
          table: "Reviews",
          field: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
        schema,
      }
    );
    console.log("Constraint added for ReviewImages...");
    console.log("Finished adding constraints...");
  },

  async down(queryInterface) {
    await queryInterface.removeConstraint(
      "Bookings",
      "Bookings_userId_Users_fk",
      { schema }
    );
    await queryInterface.removeConstraint(
      "Bookings",
      "Bookings_spotId_Spots_fk",
      { schema }
    );

    await queryInterface.removeConstraint(
      "Spots",
      "Spots_ownerId_Users_fk",
      { schema }
    );
    await queryInterface.removeConstraint(
      "SpotImages",
      "SpotImages_spotId_Spots_fk",
      { schema }
    );
    await queryInterface.removeConstraint(
      "Reviews",
      "Reviews_userId_Users_fk",
      { schema }
    );
    await queryInterface.removeConstraint(
      "Reviews",
      "Reviews_spotId_Spots_fk",
      { schema }
    );
    await queryInterface.removeConstraint(
      "ReviewImages",
      "ReviewImages_reviewId_Reviews_fk",
      { schema }
    );
  },
};
