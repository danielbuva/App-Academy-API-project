"use strict";

const { User, Spot } = require("../models");

let options = { tableName: "Spots" };
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

const spots = [
  {
    address: "101 Snake Eyes Dr.",
    city: "Denver",
    state: "Colorado",
    country: "US",
    lat: 39.7392,
    lng: 104.9903,
    name: "Pair of Dice",
    description:
      "Welcome to Pair of Dice. You will enjoy your stay! （￣︶￣）↗",
    price: 1000000,
  },
  {
    address: "420 W Riverside Ave #113",
    city: "Seattle",
    state: "Washington",
    country: "US",
    lat: 47.6062,
    lng: 122.3321,
    name: "Home Away From Home",
    description:
      "Welcome to your Home Away From Home. You will enjoy your stay! (✿◡‿◡)",
    price: 690000,
  },
  {
    address: "1969 Isabel St",
    city: "Los Angeles",
    state: "California",
    country: "US",
    lat: 34.0522,
    lng: 118.2437,
    name: "cool house",
    description:
      "Welcome to cool house. You will enjoy your stay! (*^_^*)",
    price: 10,
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up() {
    const user = await User.findOne({
      attributes: ["id"],
      where: { email: "lilykay@gmail.com" },
    });
    for (let i = 0; i < spots.length; i++) {
      await Spot.create({
        ownerId: user.id,
        address: spots[i].address,
        city: spots[i].city,
        state: spots[i].state,
        country: spots[i].country,
        lat: spots[i].lat,
        lng: spots[i].lng,
        name: spots[i].name,
        description: spots[i].description,
        price: spots[i].price,
      });
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, {
      address: {
        [Sequelize.Op.in]: [
          "1969 Isabel St",
          "420 W Riverside Ave #113",
          "101 Snake Eyes Dr.",
        ],
      },
    });
  },
};
