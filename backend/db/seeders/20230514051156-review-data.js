"use strict";
const reviews = [
  {
    id: 1,
    spotId: 3,
    userId: 1,
    review: "cool place",
    stars: 5,
  },
  {
    id: 2,
    spotId: 2,
    userId: 1,
    review: "cozy place",
    stars: 5,
  },
  {
    id: 3,
    spotId: 1,
    userId: 1,
    review: "sick place",
    stars: 5,
  },
  {
    id: 4,
    spotId: 3,
    userId: 2,
    review: "burr",
    stars: 5,
  },
  {
    id: 5,
    spotId: 2,
    userId: 2,
    review: "homey",
    stars: 5,
  },
  {
    id: 6,
    spotId: 1,
    userId: 2,
    review: "dope place",
    stars: 5,
  },
  {
    id: 7,
    spotId: 3,
    userId: 3,
    review: "chill place",
    stars: 5,
  },
  {
    id: 8,
    spotId: 2,
    userId: 3,
    review: "warm place",
    stars: 5,
  },
  {
    id: 9,
    spotId: 1,
    userId: 3,
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
  async up(queryInterface) {
    await queryInterface.bulkInsert(options, reviews);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, {
      id: {
        [Sequelize.Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      },
    });
  },
};
