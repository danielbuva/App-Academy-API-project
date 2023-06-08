"use strict";

const { Spot, User, Review } = require("../models");

const data = [
  {
    address: "550 Second St",
    email: "mgerola@gmail.com",
    review:
      "We spent one night here on our way down to Carmel. The location of the home was awesome. Beautiful view from every window. There was a lot of space for 6 of us. The outdoor decks were an awesome place to hang out and relax!",
    stars: 5,
  },
  {
    address: "5606 Carpinteria Ave",
    email: "mgerola@gmail.com",
    review:
      "I can be a bit picky when it comes to cleanliness at places I stay and the space was incredibly clean, had adorable and modern decor, and couldn’t be any closer to the beach. Beach chairs and towels were ready for us when we arrived which was very convenient. There was a Nespresso machine available to use and even came with delicious flavored creamers! All around this place was beautiful, clean, safe, bigger than I expected and a short drive to Santa Barbara should you want to venture out. I would highly recommend!",
    stars: 5,
  },
  {
    address: "450 N Meadow Dr",
    email: "mgerola@gmail.com",
    review:
      "A wonderful stay nestled in a beautiful area. This was a fantastic stay. We’d do it again when in the area.",
    stars: 5,
  },
  {
    address: "R. do Alto da Veiga",
    email: "mgerola@gmail.com",
    review: `The house is a museum in the 1920s very well maintained by the family that owns the space. The house itself has all the amenities for people to feel cozy and comfortable.
    Our visit was for New Year's Eve and everything went really well.`,
    stars: 5,
  },
  {
    address: "2555 Savannah Ave",
    email: "mgerola@gmail.com",
    review: `Mike’s End of the Rainbow
    Was exactly what we sought. Peaceful place to unwind.
    No neighbor issues. The bridge overhead takes getting used to though. Not for light sleepers.
    However it was exactly what I expected.
    It’s a Shrimpboat, washed up by a hurricane that’s been revamped into air B&B.
    Thanks to Mike for the very unique experience!`,
    stars: 5,
  },
  {
    address: "3101 Watson Lake Park Rd",
    email: "mgerola@gmail.com",
    review:
      "Such a fun unique place to stay! Very well built tree house with natural lighting. The ladder going up felt very safe and sturdy. The attached house was comfortable and bathrooms clean and well labeled, as well as many add ons( bikes, games, coffee etc) that made this an all around well put together place.",
    stars: 5,
  },
  {
    address: "550 Second St",
    email: "joshm@gmail.com",
    review:
      "I stayed here with some friends (8 people total). It's a beautiful location. The views from every part of this house are fantastic. The upstairs patio makes a great hangout spot for grilling and relaxing. The hot tub was clean and worked well. The garage has a really convenient outdoor shower for washing off after the hot tub or ocean. Lots of amenities here too! We primarily used the e-bikes, ping pong table, and hot tub. Evan is also a super responsive and helpful host. I'd stay here again :)",
    stars: 5,
  },
  {
    address: "5606 Carpinteria Ave",
    email: "joshm@gmail.com",
    review:
      "The beach suite is as photographed. It’s delightful and clean, and close to the beach (a few hundred feet). We had trouble with noise and privacy. The loud thumping and banging started above us at 1040pm and continued till 5am with no ability to sleep. That was our first night. The following day, the adjacent beach suite was hosting a little party and they had to walk on the designated porch for our suite over and over and took the relaxation away. We left that day and forfeited our second night to get some rest. No credit or apology was offered after discussing with owner just a “good to know”. In short, beautiful but little privacy. Or quiet.",
    stars: 2,
  },
  {
    address: "450 N Meadow Dr",
    email: "joshm@gmail.com",
    review:
      "Check-in was simple, quick and had easy instructions to follow. The place is even cuter than the photos. It is the perfect size for a family of four. We woke up to the peaceful sounds of horses right outside. The views are incredible and so serene. We would definitely stay here again.",
    stars: 5,
  },
  {
    address: "R. do Alto da Veiga",
    email: "joshm@gmail.com",
    review:
      "Animádevos a visitar unha fermosa casa con encanto. Un síntese parte da história da mesma. Cun trato cercano e familiar. Onde impera a conservacion e o gusto polos detalles .",
    stars: 5,
  },
  {
    address: "2555 Savannah Ave",
    email: "joshm@gmail.com",
    review: `Mike is friendly and helpful. His place has such a sweet concept. It just needs some upkeep and a through cleaning. It is not a good place for seniors with mobility issues. The floor is not level so hard to walk steadly on. Lots of steps.
    There is a neat deck for relaxing and fishing.`,
    stars: 5,
  },
  {
    address: "3101 Watson Lake Park Rd",
    email: "joshm@gmail.com",
    review:
      "The treehouse was so nice we loved it. The host was very nice and we will be back to stay again in the future. If you are looking for something different for your adventure this is the spot. Thank you so much Josh.",
    stars: 5,
  },
  {
    address: "550 Second St",
    email: "daniboo@gmail.com",
    review: "Great location and views",
    stars: 5,
  },
  {
    address: "5606 Carpinteria Ave",
    email: "daniboo@gmail.com",
    review: "5 star stay! Perfect location with a great view of the beach",
    stars: 5,
  },
  {
    address: "450 N Meadow Dr",
    email: "daniboo@gmail.com",
    review:
      "Beautiful place! Everything as described, comfy and clean and the communication was great. We enjoyed our stay a lot!",
    stars: 5,
  },
  {
    address: "R. do Alto da Veiga",
    email: "daniboo@gmail.com",
    review: "cool place",
    stars: 5,
  },
  {
    address: "2555 Savannah Ave",
    email: "daniboo@gmail.com",
    review:
      "If you’re tall or claustrophobic, this is not the place for you. If you like privacy, this is not the place for you. If you are average/normal sized person, the shower is not for you. Water pressure was nonexistent all around. Don’t try to bring your stuff in through the starboard side door at the helm especially late at night. Also we were told bedding would not be provided due to covid… (04/19/23) Overall the concept is awesome and has a true shrimp boat feel but just understand what you are getting yourself into ahead of time. I feel like the ad is a little misleading. The upper and lower decks by the water are great to hangout and relax. The AC works phenomenally, the place gets super cold and we slept great! With all that being said, we did enjoy our stay but still left a day early.",
    stars: 4,
  },
  {
    address: "3101 Watson Lake Park Rd",
    email: "daniboo@gmail.com",
    review:
      "The treehouse was great and a lot cheaper than the hotels in the area. The main house was clean and cozy and the other guests were pleasant. The location is great as it's close enough to walk to downtown Prescott and Whiskey Row. Check-in/out were as easy as showing up and leaving and shooting the host a quick message. I'd stay there again",
    stars: 5,
  },
  {
    address: "550 Second St",
    email: "laurentlucian@gmail.com",
    review:
      "Had the best time at this beautiful home! Also, super great spot to surf and explore. The house also included lots of boards and wetsuits. Will definitely book again when we go back to Santa Cruz.",
    stars: 5,
  },
  {
    address: "5606 Carpinteria Ave",
    email: "laurentlucian@gmail.com",
    review:
      "A quaint little beach spot walking distance from so much! We were only an hour away from home but felt those serious vacay vibes. Great spot and we will certainly be back!!",
    stars: 5,
  },
  {
    address: "450 N Meadow Dr",
    email: "laurentlucian@gmail.com",
    review:
      "This was such a fun YCSHIYP! The farm was quaint and rustic and the view and surroundings was awesome. I really enjoyed sitting on the upstairs deck and watching the chickens, goats, and horses.",
    stars: 5,
  },
  {
    address: "R. do Alto da Veiga",
    email: "laurentlucian@gmail.com",
    review:
      "I feel like garfield in the movie Garfield: A Tail of Two Kitties",
    stars: 5,
  },
  {
    address: "2555 Savannah Ave",
    email: "laurentlucian@gmail.com",
    review:
      "Nice host helpful with recommendations on food and more. Friendly family and good crabbing and can’t forget the scenery is nice and peaceful especially at nite",
    stars: 5,
  },
  {
    address: "3101 Watson Lake Park Rd",
    email: "laurentlucian@gmail.com",
    review:
      "I had a great stay in the treehouse!! I came from CA for the whiskey off-road mountain bike festival & to see Greensky Bluegrass play! I was stoked to be able to ride into town on one of the provided bikes! Great experience overall! Def recommend!",
    stars: 5,
  },
  {
    address: "550 Second St",
    email: "tanyamikaia@gmail.com",
    review:
      "Beautiful surroundings, amazing house and helpful host. Had a wonderful and peaceful stay.",
    stars: 5,
  },
  {
    address: "5606 Carpinteria Ave",
    email: "tanyamikaia@gmail.com",
    review:
      "Jeff’s place was an amazing stone’s throw from a great SB area beach and lots of fun sights/restaurants. Amenities were top notch, place was immaculately clean, communication was prompt. Perfect destination for part of our coastal California trip.",
    stars: 5,
  },
  {
    address: "450 N Meadow Dr",
    email: "tanyamikaia@gmail.com",
    review:
      "We enjoyed our stay! Far enough out from St George to be quiet and peaceful but close enough to go in for dinner. Easy distance to multiple hikes. We recommend going to Veyo Pies!! Delicious! The kitchen was small due to space limitations but we were still able to cook breakfast and dinner. We loved the balcony in the evening to watch the sunset. Overall we were extremely happy with our stay!",
    stars: 5,
  },
  {
    address: "R. do Alto da Veiga",
    email: "tanyamikaia@gmail.com",
    review: `Just fabulous! The house is beautiful, the grounds are amazing and the surroundings are so tranquil you feel in another world. It is a true escape location where you can unwind. The children loved walking, rowing boats and exploring the grounds.
    The bedrooms and bathrooms are stunning , constant hot water and lovely touches in every room. The homemade bread, jams and cakes were lovely. An absolute gem of a place!`,
    stars: 5,
  },
  {
    address: "2555 Savannah Ave",
    email: "tanyamikaia@gmail.com",
    review:
      "What a special place and fun experience. Great fishing and crabbing. Everything about the place reflects Mike and his charm. I was lucky to have spent my birthday there. The Gulf Coast Museum is worth a visit too. Thank you Mike Deasy and Candy for Candles.",
    stars: 5,
  },
  {
    address: "3101 Watson Lake Park Rd",
    email: "tanyamikaia@gmail.com",
    review:
      "Absolutely unique place, walkable to great downtown Prescott.",
    stars: 5,
  },
  {
    address: "550 Second St",
    email: "chiefyangga@gmail.com",
    review: `Evan was very kind and responsive to a few trivial items we needed; we will definitely come back again!
    bianca`,
    stars: 5,
  },
  {
    address: "5606 Carpinteria Ave",
    email: "chiefyangga@gmail.com",
    review:
      "When heading to Carpinteria or Santa Barbara you can't go wrong with this gem on the water. The room is so inviting and cute! You can stay in the room and patio, head to the beach, or walk around town. The description is exactly what you get. We had a wonderful time!",
    stars: 5,
  },
  {
    address: "450 N Meadow Dr",
    email: "chiefyangga@gmail.com",
    review:
      "The beds were comfy, thoughtful touches like popcorn available and lots of towels, the balcony was great for star gazing and chicken watching!",
    stars: 5,
  },
  {
    address: "R. do Alto da Veiga",
    email: "chiefyangga@gmail.com",
    review: "I am a princess and this is my castle",
    stars: 5,
  },
  {
    address: "2555 Savannah Ave",
    email: "chiefyangga@gmail.com",
    review: `Perfect romantic getaway for us!
    Loved the fishing and relaxed atmosphere! So wonderful for us!`,
    stars: 5,
  },
  {
    address: "3101 Watson Lake Park Rd",
    email: "chiefyangga@gmail.com",
    review:
      "What a wonderful stay at Josh's treehouse! Sleeping among the trees is a dream come true.",
    stars: 5,
  },
];

let options = { tableName: "Reviews" };
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up() {
    for (let i = 0; i < data.length; i++) {
      const user = await User.findOne({
        attributes: ["id"],
        where: { email: data[i].email },
      });
      const spot = await Spot.findOne({
        attributes: ["id"],
        where: { address: data[i].address },
      });
      await Review.create({
        spotId: spot.id,
        userId: user.id,
        review: data[i].review,
        stars: data[i].stars,
      });
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, {
      review: {
        [Sequelize.Op.in]: [
          "What a wonderful stay at Josh's treehouse! Sleeping among the trees is a dream come true.",
          `Perfect romantic getaway for us!
    Loved the fishing and relaxed atmosphere! So wonderful for us!`,
          "I am a princess and this is my castle",
          "The beds were comfy, thoughtful touches like popcorn available and lots of towels, the balcony was great for star gazing and chicken watching!",
          "When heading to Carpinteria or Santa Barbara you can't go wrong with this gem on the water. The room is so inviting and cute! You can stay in the room and patio, head to the beach, or walk around town. The description is exactly what you get. We had a wonderful time!",
          `Evan was very kind and responsive to a few trivial items we needed; we will definitely come back again!
    bianca`,
          "Absolutely unique place, walkable to great downtown Prescott.",
          "What a special place and fun experience. Great fishing and crabbing. Everything about the place reflects Mike and his charm. I was lucky to have spent my birthday there. The Gulf Coast Museum is worth a visit too. Thank you Mike Deasy and Candy for Candles.",
          `Just fabulous! The house is beautiful, the grounds are amazing and the surroundings are so tranquil you feel in another world. It is a true escape location where you can unwind. The children loved walking, rowing boats and exploring the grounds.
    The bedrooms and bathrooms are stunning , constant hot water and lovely touches in every room. The homemade bread, jams and cakes were lovely. An absolute gem of a place!`,
          "We enjoyed our stay! Far enough out from St George to be quiet and peaceful but close enough to go in for dinner. Easy distance to multiple hikes. We recommend going to Veyo Pies!! Delicious! The kitchen was small due to space limitations but we were still able to cook breakfast and dinner. We loved the balcony in the evening to watch the sunset. Overall we were extremely happy with our stay!",
          "Jeff’s place was an amazing stone’s throw from a great SB area beach and lots of fun sights/restaurants. Amenities were top notch, place was immaculately clean, communication was prompt. Perfect destination for part of our coastal California trip.",
          "Beautiful surroundings, amazing house and helpful host. Had a wonderful and peaceful stay.",
          "I had a great stay in the treehouse!! I came from CA for the whiskey off-road mountain bike festival & to see Greensky Bluegrass play! I was stoked to be able to ride into town on one of the provided bikes! Great experience overall! Def recommend!",
          "Nice host helpful with recommendations on food and more. Friendly family and good crabbing and can’t forget the scenery is nice and peaceful especially at nite",
          "I feel like garfield in the movie Garfield: A Tail of Two Kitties",
          "This was such a fun YCSHIYP! The farm was quaint and rustic and the view and surroundings was awesome. I really enjoyed sitting on the upstairs deck and watching the chickens, goats, and horses.",
          "A quaint little beach spot walking distance from so much! We were only an hour away from home but felt those serious vacay vibes. Great spot and we will certainly be back!!",
          "Had the best time at this beautiful home! Also, super great spot to surf and explore. The house also included lots of boards and wetsuits. Will definitely book again when we go back to Santa Cruz.",
          "The treehouse was great and a lot cheaper than the hotels in the area. The main house was clean and cozy and the other guests were pleasant. The location is great as it's close enough to walk to downtown Prescott and Whiskey Row. Check-in/out were as easy as showing up and leaving and shooting the host a quick message. I'd stay there again",
          "If you’re tall or claustrophobic, this is not the place for you. If you like privacy, this is not the place for you. If you are average/normal sized person, the shower is not for you. Water pressure was nonexistent all around. Don’t try to bring your stuff in through the starboard side door at the helm especially late at night. Also we were told bedding would not be provided due to covid… (04/19/23) Overall the concept is awesome and has a true shrimp boat feel but just understand what you are getting yourself into ahead of time. I feel like the ad is a little misleading. The upper and lower decks by the water are great to hangout and relax. The AC works phenomenally, the place gets super cold and we slept great! With all that being said, we did enjoy our stay but still left a day early.",
          "Beautiful place! Everything as described, comfy and clean and the communication was great. We enjoyed our stay a lot!",
          "5 star stay! Perfect location with a great view of the beach",
          "Great location and views",
          "The treehouse was so nice we loved it. The host was very nice and we will be back to stay again in the future. If you are looking for something different for your adventure this is the spot. Thank you so much Josh.",
          `Mike is friendly and helpful. His place has such a sweet concept. It just needs some upkeep and a through cleaning. It is not a good place for seniors with mobility issues. The floor is not level so hard to walk steadly on. Lots of steps.
          There is a neat deck for relaxing and fishing.`,
          "Animádevos a visitar unha fermosa casa con encanto. Un síntese parte da história da mesma. Cun trato cercano e familiar. Onde impera a conservacion e o gusto polos detalles .",
          "Check-in was simple, quick and had easy instructions to follow. The place is even cuter than the photos. It is the perfect size for a family of four. We woke up to the peaceful sounds of horses right outside. The views are incredible and so serene. We would definitely stay here again.",
          "The beach suite is as photographed. It’s delightful and clean, and close to the beach (a few hundred feet). We had trouble with noise and privacy. The loud thumping and banging started above us at 1040pm and continued till 5am with no ability to sleep. That was our first night. The following day, the adjacent beach suite was hosting a little party and they had to walk on the designated porch for our suite over and over and took the relaxation away. We left that day and forfeited our second night to get some rest. No credit or apology was offered after discussing with owner just a “good to know”. In short, beautiful but little privacy. Or quiet.",
          "I stayed here with some friends (8 people total). It's a beautiful location. The views from every part of this house are fantastic. The upstairs patio makes a great hangout spot for grilling and relaxing. The hot tub was clean and worked well. The garage has a really convenient outdoor shower for washing off after the hot tub or ocean. Lots of amenities here too! We primarily used the e-bikes, ping pong table, and hot tub. Evan is also a super responsive and helpful host. I'd stay here again :)",
          "Such a fun unique place to stay! Very well built tree house with natural lighting. The ladder going up felt very safe and sturdy. The attached house was comfortable and bathrooms clean and well labeled, as well as many add ons( bikes, games, coffee etc) that made this an all around well put together place.",
          `Mike’s End of the Rainbow
          Was exactly what we sought. Peaceful place to unwind.
          No neighbor issues. The bridge overhead takes getting used to though. Not for light sleepers.
          However it was exactly what I expected.
          It’s a Shrimpboat, washed up by a hurricane that’s been revamped into air B&B.
          Thanks to Mike for the very unique experience!`,
          `The house is a museum in the 1920s very well maintained by the family that owns the space. The house itself has all the amenities for people to feel cozy and comfortable.
    Our visit was for New Year's Eve and everything went really well.`,
          "A wonderful stay nestled in a beautiful area. This was a fantastic stay. We’d do it again when in the area.",
          "I can be a bit picky when it comes to cleanliness at places I stay and the space was incredibly clean, had adorable and modern decor, and couldn’t be any closer to the beach. Beach chairs and towels were ready for us when we arrived which was very convenient. There was a Nespresso machine available to use and even came with delicious flavored creamers! All around this place was beautiful, clean, safe, bigger than I expected and a short drive to Santa Barbara should you want to venture out. I would highly recommend!",
          "We spent one night here on our way down to Carmel. The location of the home was awesome. Beautiful view from every window. There was a lot of space for 6 of us. The outdoor decks were an awesome place to hang out and relax!",
        ],
      },
    });
  },
};
