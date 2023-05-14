"use strict";
const reviews = [
  {
    id: 1,
    reviewId: 1,
    url: "https://imgur.com/zMyxoiN",
  },
  {
    id: 2,
    reviewId: 2,
    url: "https://imgur.com/1U1Zr7I",
  },
  {
    id: 3,
    reviewId: 3,
    url: "https://imgur.com/StkDcOy",
  },
  {
    id: 4,
    reviewId: 4,
    url: "https://imgur.com/TEMGYjY",
  },
  {
    id: 5,
    reviewId: 5,
    url: "https://imgur.com/Uschheg",
  },
  {
    id: 6,
    reviewId: 6,
    url: "https://imgur.com/pqggrK0",
  },
  {
    id: 7,
    reviewId: 7,
    url: "https://imgur.com/mX6tqVa",
  },
  {
    id: 8,
    reviewId: 8,
    url: 5,
  },
  {
    id: 9,
    reviewId: 9,
    url: 5,
  },
];

let options = { tableName: "ReviewImages" };
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
