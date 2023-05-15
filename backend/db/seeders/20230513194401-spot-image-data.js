"use strict";

const { Spot, SpotImage } = require("../models");

let options = { tableName: "SpotImages" };
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

const data = [
  {
    address: "101 Snake Eyes Dr.",
    url: "https://imgur.com/L6xNLxH",
    preview: true,
  },
  {
    address: "420 W Riverside Ave #113",
    url: "https://imgur.com/rASG43d",
    preview: true,
  },
  {
    address: "1969 Isabel St",
    url: "https://imgur.com/X6OTyyi",
    preview: true,
  },
  {
    address: "1969 Isabel St",
    url: "https://imgur.com/RqS4Efu",
    preview: true,
  },
  {
    address: "1969 Isabel St",
    url: "https://imgur.com/IsAlUfg",
    preview: true,
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up() {
    for (let i = 0; i < data.length; i++) {
      const spot = await Spot.findOne({
        attributes: ["id"],
        where: { address: data[i].address },
      });
      await SpotImage.create({
        spotId: spot.id,
        url: data[i].url,
        preview: data[i].preview,
      });
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, {
      url: {
        [Sequelize.Op.in]: [
          "https://imgur.com/L6xNLxH",
          "https://imgur.com/rASG43d",
          "https://imgur.com/X6OTyyi",
          "https://imgur.com/RqS4Efu",
          "https://imgur.com/IsAlUfg",
        ],
      },
    });
  },
};
