"use strict";

const { Booking, Spot, User } = require("../models");

const data = [
  {
    address: "101 Snake Eyes Dr.",
    email: "demo@user.io",
    startDate: "2027-11-30",
    endDate: "2027-12-05",
  },
  {
    address: "420 W Riverside Ave #113",
    email: "demo@user.io",
    startDate: "2027-12-06",
    endDate: "2027-12-11",
  },
  {
    address: "1969 Isabel St",
    email: "demo@user.io",
    startDate: "2027-12-14",
    endDate: "2027-12-19",
  },
  {
    address: "1969 Isabel St",
    email: "user1@user.io",
    startDate: "2027-11-30",
    endDate: "2027-12-05",
  },
  {
    address: "101 Snake Eyes Dr.",
    email: "user1@user.io",
    startDate: "2027-12-06",
    endDate: "2027-12-11",
  },
  {
    address: "420 W Riverside Ave #113",
    email: "user1@user.io",
    startDate: "2028-01-14",
    endDate: "2028-01-19",
  },
  {
    address: "101 Snake Eyes Dr.",
    email: "user2@user.io",
    startDate: "2028-11-30",
    endDate: "2028-12-05",
  },
  {
    address: "420 W Riverside Ave #113",
    email: "user2@user.io",
    startDate: "2029-01-01",
    endDate: "2029-01-06",
  },
  {
    address: "1969 Isabel St",
    email: "user2@user.io",
    startDate: "2029-03-03",
    endDate: "2029-03-08",
  },
];

let options = { tableName: "Bookings" };
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up() {
    // for (let i = 0; i < data.length; i++) {
    //   const user = await User.findOne({
    //     attributes: ["id"],
    //     where: { email: data[i].email },
    //   });
    //   const spot = await Spot.findOne({
    //     attributes: ["id"],
    //     where: { address: data[i].address },
    //   });
    //   await Booking.create({
    //     spotId: spot.id,
    //     userId: user.id,
    //     startDate: data[i].startDate,
    //     endDate: data[i].endDate,
    //   });
    // }
  },

  async down(queryInterface, Sequelize) {
    // await queryInterface.bulkDelete(options, {
    //   startDate: {
    //     [Sequelize.Op.in]: [
    //       "2027-11-30",
    //       "2027-12-06",
    //       "2027-12-14",
    //       "2029-03-03",
    //       "2028-11-30",
    //       "2028-01-14",
    //       "2029-01-01",
    //     ],
    //   },
    // });
  },
};
