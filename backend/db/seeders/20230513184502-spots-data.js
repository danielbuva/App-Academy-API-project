"use strict";

const { User, Spot } = require("../models");

let options = { tableName: "Spots" };
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

const spots = [
  {
    username: "Even",
    address: "550 Second St",
    zipcode: 95060,
    city: "Santa Cruz",
    state: "California",
    country: "United States",
    lat: 39.7392,
    lng: -104.9903,
    name: "180° OceanView+HotTub+EBikes+Surfboards+SUPS+Kayak",
    description: `Incredible beach home with sweeping views of the ocean. Watch the waves crash from your bed. Directly in front of Pleasure Point, a world class surf spot.
      180° upstairs decks to lounge & enjoy the ocean and views of the ocean from every room in the home.
      Hot tub, cedar sauna, 4 electric bikes, surfboards, stand-up paddle boards, sea kayak, ping pong table, basketball arcade game, dart board, and ping pong robot.`,
    price: 1465,
  },
  {
    username: "Jeffy",
    address: "5606 Carpinteria Ave",
    zipcode: "93013",
    city: "Carpinteria",
    state: "California",
    country: "United States",
    lat: 34.3989,
    lng: -119.5185,
    name: "New Beach Loft at Padero Beach. On the water in SB",
    description:
      "Welcome the the newly completed Sea Lofts at Padaro Beach. This is Santa Barbara's most exclusive beach. You won't find closer accommodations to the water for miles. Not only are you a few feet from the sea, you are a hundred yards from surf shops, restaurants and boutiques. The Sea Lofts are the premier beach destination for Santa Barbara. You can walk for miles at low tide, or just sit on the deck or beach and watch the sunset. The lofts are well appointed with kitchenettes.",
    price: 575,
  },
  {
    username: "TheKyle",
    address: "450 N Meadow Dr",
    zipcode: "84783",
    city: "Dammeron Valley",
    state: "Utah",
    country: "United States",
    lat: 37.3045,
    lng: -113.672,
    name: "Coziest barn in town!",
    description: `Our dream barnhouse located in beautiful Dammeron Valley Utah.
      Only 17 miles from Saint George Ut with Many options just a drive away from your greatest adventures. 10 to 15 degrees cooler than St. George.
      Minutes away from endless trails for hiking, biking, horse back, or ATV, there is so much to do.
      Enjoy the awesome views from the deck, cook you up a burger on the BBQ and watch the sunset. Spacious inside that will sleep up to 5. Full kitchen and bath. Come enjoy, it will not disappoint.`,
    price: 99,
    type: "Barn",
  },
  {
    username: "Andrés",
    address: "R. do Alto da Veiga",
    addressNumber: "4910",
    zipcode: "4910-339",
    city: "Caminha",
    state: "Seixas",
    country: "Portugal",
    lat: 41.899,
    lng: -8.8164,
    name: "Victorian House with Garden and Pool",
    description: `Full house rental with garden, pool, play area, 1000 m2 + 6000 m2 garden.
      It does not have a kitchen for guest use, but breakfast is included and is served in the elegant rooms of the house.
      There is daily room service.
      It is rented exclusively for groups from 4 to 12 people.
      Next to the house there are several restaurants with a very low price and high quality traditional Portuguese food.`,
    price: 1070,
    type: "Castle",
  },
  {
    username: "Mike&Ike",
    address: "2555 Savannah Ave",
    zipcode: "77640",
    city: "Port Arthur",
    state: "Texas",
    country: "United States",
    lat: 29.884951,
    lng: -93.939949,
    name: "END OF THE RAINBOW ON THE WATER",
    description: `50 foot retired shrimp boat converted into a unique tiny house, on the Neches River. Located on a quiet private road under the historic Rainbow Bridge, half mile joins Sabine Lake, the intracoastal waterway, and beyond. Great fishing, crabbing, and a private boat dock just steps away. Parking for your vehicle and boat trailer. Communal green space with grill. Relax on the deck, fish, and watch as the big ships travel up river.`,
    price: 94,
    type: "Boat",
  },
  {
    username: "JoshyB",
    address: "3101 Watson Lake Park Rd",
    zipcode: "86301",
    city: "Prescott",
    state: "Arizona",
    country: "United States",
    lat: 34.0522,
    lng: -118.2437,
    name: "Treehouse",
    description:
      "Stay in a treehouse!  It has a twin bed, a desk, and a dresser. There is a space heater for cold weather. You also have access to the common areas in the shared house which includes WiFi, kitchen, two bathrooms, laundry room, and living and dining areas.",
    price: 50,
    type: "Treehouse",
    place: "A room",
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up() {
    for (let i = 0; i < spots.length; i++) {
      const user = await User.findOne({
        attributes: ["id"],
        where: { username: spots[i].username },
      });
      await Spot.create({
        ownerId: user.id,
        address: spots[i].address,
        city: spots[i].city,
        state: spots[i].state,
        country: spots[i].country,
        lat: spots[i].lat,
        lng: spots[i].lng,
        name: spots[i].name,
        description: spots[i].description,
        place: spots[i].place,
        price: spots[i].price,
        type: spots[i].type,
        zipcode: spots[i].zipcode,
      });
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, {
      address: {
        [Sequelize.Op.in]: [
          "550 Second St",
          "5606 Carpinteria Ave",
          "450 N Meadow Dr, 84783",
          "R. do Alto da Veiga",
          "2555 Savannah Ave",
          "3101 Watson Lake Park Rd",
        ],
      },
    });
  },
};
