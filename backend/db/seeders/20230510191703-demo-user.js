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
      console.log("Start seeding...");
      await queryInterface.bulkInsert(
        options,
        [
          {
            id: 1,
            firstName: "demo",
            lastName: "user",
            email: "demo@user.io",
            username: "Demo-lition",
            hashedPassword: bcrypt.hashSync("password"),
          },
          {
            id: 2,
            firstName: "fake",
            lastName: "user",
            email: "user1@user.io",
            username: "FakeUser1",
            hashedPassword: bcrypt.hashSync("password2"),
          },
          {
            id: 3,
            firstName: "fakedemo",
            lastName: "user",
            email: "user2@user.io",
            username: "FakeUser2",
            hashedPassword: bcrypt.hashSync("password3"),
          },
        ],
        {}
      );
    } catch (err) {
      console.log(err);
      console.error(err);
    }
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Users";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        id: { [Op.in]: [1, 2, 3] },
      },
      {}
    );
  },
};
