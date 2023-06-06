"use strict";

let options = { tableName: "Spots" };
if (process.env.NODE_ENV === "production" && process.env.SCHEMA) {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.addColumn(options, "type", {
      type: Sequelize.ENUM,
      values: [
        "House",
        "Apartment",
        "Barn",
        "Bed & breakfast",
        "Boat",
        "Cabin",
        "Camper/RV",
        "Casa particular",
        "Castle",
        "Cave",
        "Container",
        "Cycladic home",
        "Dammuso",
        "Dome",
        "Earth home",
        "Farm",
        "Guesthouse",
        "Hotel",
        "Houseboat",
        "Kezhan",
        "Minsu",
        "Riad",
        "Ryokan",
        "Shepherd's hut",
        "Tent",
        "Tiny home",
        "Tower",
        "Treehouse",
        "Trulio",
        "Windmill",
        "Yurt",
      ],
      allowNull: false,
      defaultValue: "House",
    });
    queryInterface.addColumn(options, "place", {
      type: Sequelize.ENUM,
      values: ["An entire place", "A room", "A shared room"],
      allowNull: false,
      defaultValue: "An entire place",
    });
  },

  async down(queryInterface) {
    queryInterface.removeColumn(options, "type");
    queryInterface.removeColumn(options, "place");
  },
};
