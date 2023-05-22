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
            firstName: "fake",
            lastName: "user",
            email: "user1@user.io",
            username: "FakeUser1",
            hashedPassword: bcrypt.hashSync("password2"),
          },
          {
            firstName: "fakedemo",
            lastName: "user",
            email: "user2@user.io",
            username: "FakeUser2",
            hashedPassword: bcrypt.hashSync("password3"),
          },
          {
            firstName: "Lily",
            lastName: "Kay",
            email: "lilykay@gmail.com",
            username: "tesha",
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
          "user1@user.io",
          "user2@user.io",
          "lilykay@gmail.com",
        ],
      },
    });
  },
};
