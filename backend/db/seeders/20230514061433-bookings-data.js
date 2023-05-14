"use strict";
const reviews = [
  {
    id: 1,
    spotId: 1,
    userId: 1,
    startDate: "1997-11-30",
    endDate: "1997-12-05",
  },
  {
    id: 2,
    spotId: 2,
    userId: 1,
    startDate: "1997-12-06",
    endDate: "1997-12-11",
  },
  {
    id: 3,
    spotId: 3,
    userId: 1,
    startDate: "1997-12-14",
    endDate: "1997-12-19",
  },
  {
    id: 4,
    spotId: 3,
    userId: 2,
    startDate: "1997-11-30",
    endDate: "1997-12-05",
  },
  {
    id: 5,
    spotId: 1,
    userId: 2,
    startDate: "1997-12-06",
    endDate: "1997-12-11",
  },
  {
    id: 6,
    spotId: 2,
    userId: 2,
    startDate: "1998-01-14",
    endDate: "1998-01-19",
  },
  {
    id: 7,
    spotId: 1,
    userId: 3,
    startDate: "1998-11-30",
    endDate: "1998-12-05",
  },
  {
    id: 8,
    spotId: 2,
    userId: 3,
    startDate: "1999-01-01",
    endDate: "1999-01-06",
  },
  {
    id: 9,
    spotId: 3,
    userId: 3,
    startDate: "1999-03-03",
    endDate: "1999-03-08",
  },
];

let options = { tableName: "Bookings" };
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
