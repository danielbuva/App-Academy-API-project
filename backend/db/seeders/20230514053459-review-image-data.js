"use strict";

const { Review, ReviewImage } = require("../models");

const data = [
  {
    review: "cool place",
    url: "https://imgur.com/zMyxoiN",
  },
  {
    review: "cozy place",
    url: "https://imgur.com/1U1Zr7I",
  },
  {
    review: "sick place",
    url: "https://imgur.com/StkDcOy",
  },
  {
    review: "burr",
    url: "https://imgur.com/TEMGYjY",
  },
  {
    review: "homey",
    url: "https://imgur.com/Uschheg",
  },
  {
    review: "dope place",
    url: "https://imgur.com/pqggrK0",
  },
  {
    review: "chill place",
    url: "https://imgur.com/mX6tqVa",
  },
  {
    review: "warm place",
    url: "https://imgur.com/oPR4BiX",
  },
  {
    review: "peachy place",
    url: "https://imgur.com/XaxjQUm",
  },
];

let options = { tableName: "ReviewImages" };
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up() {
    // for (let i = 0; i < data.length; i++) {
    //   const review = await Review.findOne({
    //     attributes: ["id"],
    //     where: { review: data[i].review },
    //   });
    //   await ReviewImage.create({ reviewId: review.id, url: data[i].url });
    // }
  },

  async down(queryInterface, Sequelize) {
    // await queryInterface.bulkDelete(options, {
    //   url: {
    //     [Sequelize.Op.in]: [
    //       "https://imgur.com/XaxjQUm",
    //       "https://imgur.com/oPR4BiX",
    //       "https://imgur.com/mX6tqVa",
    //       "https://imgur.com/pqggrK0",
    //       "https://imgur.com/TEMGYjY",
    //       "https://imgur.com/Uschheg",
    //       "https://imgur.com/StkDcOy",
    //       "https://imgur.com/1U1Zr7I",
    //       "https://imgur.com/zMyxoiN",
    //     ],
    //   },
    // });
  },
};
