"use strict";
const spotImages = [
  {
    id: 1,
    spotId: 1,
    url: "https://imgur.com/L6xNLxH",
    preview: true,
  },
  {
    id: 2,
    spotId: 2,
    url: "https://imgur.com/rASG43d",
    preview: true,
  },
  {
    id: 3,
    spotId: 3,
    url: "https://imgur.com/X6OTyyi",
    preview: true,
  },
  {
    id: 4,
    spotId: 3,
    url: "https://imgur.com/RqS4Efu",
    preview: true,
  },
  {
    id: 5,
    spotId: 3,
    url: "https://imgur.com/IsAlUfg",
    preview: true,
  },
];

let options = { tableName: "SpotImages" };
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(options, spotImages);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, {
      id: {
        [Sequelize.Op.in]: [1, 2, 3, 4, 5],
      },
    });
  },
};
