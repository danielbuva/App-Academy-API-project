"use strict";

const { Spot, User, Review } = require("../models");

const data = [
  {
    address: "1969 Isabel St",
    email: "demo@user.io",
    review: "cool place",
    stars: 5,
  },
  {
    address: "420 W Riverside Ave #113",
    email: "demo@user.io",
    review: "cozy place",
    stars: 5,
  },
  {
    address: "101 Snake Eyes Dr.",
    email: "demo@user.io",
    review: "sick place",
    stars: 5,
  },
  {
    address: "1969 Isabel St",
    email: "user1@user.io",
    review: "burr",
    stars: 5,
  },
  {
    address: "420 W Riverside Ave #113",
    email: "user1@user.io",
    review: "homey",
    stars: 5,
  },
  {
    address: "101 Snake Eyes Dr.",
    email: "user1@user.io",
    review: "dope place",
    stars: 5,
  },
  {
    address: "1969 Isabel St",
    email: "user2@user.io",
    review: "chill place",
    stars: 5,
  },
  {
    address: "420 W Riverside Ave #113",
    email: "user2@user.io",
    review: "warm place",
    stars: 5,
  },
  {
    address: "101 Snake Eyes Dr.",
    email: "user2@user.io",
    review: "peachy place",
    stars: 5,
  },
];

let options = { tableName: "Reviews" };
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up() {
    for (let i = 0; i < data.length; i++) {
      const user = await User.findOne({
        attributes: ["id"],
        where: { email: data[i].email },
      });
      const spot = await Spot.findOne({
        attributes: ["id"],
        where: { address: data[i].address },
      });
      await Review.create({
        spotId: spot.id,
        userId: user.id,
        review: data[i].review,
        stars: data[i].stars,
      });
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, {
      review: {
        [Sequelize.Op.in]: [
          "peachy place",
          "warm place",
          "chill place",
          "dope place",
          "homey",
          "burr",
          "cozy place",
          "cool place",
          "sick place",
        ],
      },
    });
  },
};
