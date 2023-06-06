"use strict";
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: async (queryInterface) => {
    options.tableName = "Users";
    try {
      await queryInterface.bulkInsert(
        options,
        [
          {
            firstName: "demo",
            lastName: "user",
            email: "demo@user.io",
            username: "Demo-lition",
            hashedPassword: bcrypt.hashSync("password"),
          },
          {
            firstName: "Andrés",
            lastName: "Salud",
            email: "Salud@gmail.com",
            username: "Andrés",
            hashedPassword: bcrypt.hashSync("696969"),
          },
          {
            firstName: "Josh",
            lastName: "Bobby",
            email: "Bobby@gmail.com",
            username: "JoshyB",
            hashedPassword: bcrypt.hashSync("696969"),
          },
          {
            firstName: "Mike",
            lastName: "Ike",
            email: "Ike@gmail.com",
            username: "Mike&Ike",
            hashedPassword: bcrypt.hashSync("696969"),
          },
          {
            firstName: "Kyle",
            lastName: "Kay",
            email: "Kay@gmail.com",
            username: "TheKyle",
            hashedPassword: bcrypt.hashSync("696969"),
          },
          {
            firstName: "Jeff",
            lastName: "Heff",
            email: "Heff@gmail.com",
            username: "Jeffy",
            hashedPassword: bcrypt.hashSync("696969"),
          },
          {
            firstName: "Evan",
            lastName: "Stevan",
            email: "Stevan@gmail.com",
            username: "Even",
            hashedPassword: bcrypt.hashSync("696969"),
          },
        ],
        {}
      );
    } catch (err) {
      console.error(err);
    }
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Users";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      email: {
        [Op.in]: [
          "demo@user.io",
          "Salud@gmail.com",
          "Bobby@gmail.com",
          "Ike@gmail.com",
          "Kay@gmail.com",
          "Heff@gmail.com",
          "Stevan@gmail.com",
        ],
      },
    });
  },
};
