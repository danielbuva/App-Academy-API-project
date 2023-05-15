"use strict";
const spots = [
  {
    id: 1,
    ownerId: 1,
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
    id: 2,
    ownerId: 2,
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
    id: 3,
    ownerId: 3,
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

let options = { tableName: "Spots" };
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(options, spots);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, {
      id: {
        [Sequelize.Op.in]: [1, 2, 3],
      },
    });
  },
};
