"use strict";
const spotImages = [
  {
    id: 1,
    spotId: 1,
    url: "https://imgur.com/gallery/bzPOz",
    preview: true,
  },
  {
    id: 2,
    spotId: 2,
    url: "https://imgur.com/gallery/Rc64s",
    preview: true,
  },
  {
    id: 3,
    spotId: 3,
    url: "https://imgur.com/gallery/sbWET",
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
        [Sequelize.Op.in]: [1, 2, 3],
      },
    });
  },
};
