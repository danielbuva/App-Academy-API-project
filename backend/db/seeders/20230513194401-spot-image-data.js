"use strict";

const { Spot, SpotImage } = require("../models");

let options = { tableName: "SpotImages" };
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

const data = [
  {
    address: "550 Second St, 95060",
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-38103188/original/84340fe9-0bab-4f9e-8c32-367e21b85066.jpeg?im_w=1200",
    preview: true,
  },
  {
    address: "550 Second St, 95060",
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-38103188/original/f38c6c31-b9fa-4adb-9af5-cf83efdb667e.jpeg?im_w=720",
    preview: true,
  },
  {
    address: "550 Second St, 95060",
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-38103188/original/fedf133f-8fa6-4ce9-b416-8cd447b7d1ce.jpeg?im_w=1200",
    preview: true,
  },
  {
    address: "550 Second St, 95060",
    url: "https://a0.muscache.com/im/pictures/4ac39e10-eada-4d1f-95fb-70a76d350bec.jpg?im_w=720",
    preview: true,
  },
  {
    address: "550 Second St, 95060",
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-38103188/original/37c6c735-cb62-437c-bad6-64d555f270ec.jpeg?im_w=720",
    preview: true,
  },
  {
    address: "550 Second St, 95060",
    url: "https://a0.muscache.com/im/pictures/55f27d65-ec2f-44b8-ae91-0fc46bb71355.jpg?im_w=1200",
    preview: true,
  },
  {
    address: "5606 Carpinteria Ave, 93013",
    url: "https://a0.muscache.com/im/pictures/50a2ed78-fc7d-441f-ba35-0f70c946cd4c.jpg?im_w=1200",
    preview: true,
  },
  {
    address: "5606 Carpinteria Ave, 93013",
    url: "https://a0.muscache.com/im/pictures/ee6c8ee5-f5aa-4ae9-9f60-3a7c232850a9.jpg?im_w=720",
    preview: true,
  },
  {
    address: "5606 Carpinteria Ave, 93013",
    url: "https://a0.muscache.com/im/pictures/1dd945d5-152f-42ac-9e80-9d3d3f94b25b.jpg?im_w=720",
    preview: true,
  },
  {
    address: "5606 Carpinteria Ave, 93013",
    url: "https://a0.muscache.com/im/pictures/2eb98f26-a348-42cf-bd04-acdf9a51a403.jpg?im_w=720",
    preview: true,
  },
  {
    address: "5606 Carpinteria Ave, 93013",
    url: "https://a0.muscache.com/im/pictures/62790a3f-41a1-4cbf-b27f-6122713740ad.jpg?im_w=720",
    preview: true,
  },
  {
    address: "5606 Carpinteria Ave, 93013",
    url: "https://a0.muscache.com/im/pictures/6b25c94a-c93d-4514-aeae-86e255d88e05.jpg?im_w=1200",
    preview: true,
  },
  {
    address: "450 N Meadow Dr, 84783",
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-20884604/original/44f69f36-1a7d-4714-80de-34618819c5d3.jpeg?im_w=1200",
    preview: true,
  },
  {
    address: "450 N Meadow Dr, 84783",
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-20884604/original/f395e19c-ef8b-438b-bffc-e9325d528707.jpeg?im_w=720",
    preview: true,
  },
  {
    address: "450 N Meadow Dr, 84783",
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-20884604/original/324c189d-2582-4688-bbc3-ce9857df6bd4.jpeg?im_w=720",
    preview: true,
  },
  {
    address: "450 N Meadow Dr, 84783",
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-20884604/original/16bb0d79-5ed5-4db4-9f95-e52fbbf74c92.jpeg?im_w=1200",
    preview: true,
  },
  {
    address: "450 N Meadow Dr, 84783",
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-20884604/original/7ea30757-2aa3-4f24-ad9a-ff63b4bd0151.jpeg?im_w=720",
    preview: true,
  },
  {
    address: "450 N Meadow Dr, 84783",
    url: "https://a0.muscache.com/im/pictures/42623aa0-84ba-4f88-9398-0fd7b303db55.jpg?im_w=720",
    preview: true,
  },
  {
    address: "3101 Watson Lake Park Rd, 86301",
    url: "https://a0.muscache.com/im/pictures/e5f2aa0a-e63a-40c4-b658-560d64ac3151.jpg?im_w=720",
    preview: true,
  },
  {
    address: "3101 Watson Lake Park Rd, 86301",
    url: "https://a0.muscache.com/im/pictures/86e8cb85-a766-41a4-b0f0-e6c3aeb177b6.jpg?im_w=720",
    preview: true,
  },
  {
    address: "3101 Watson Lake Park Rd, 86301",
    url: "https://a0.muscache.com/im/pictures/a5a3ce23-ad9d-46f2-b189-8aab9dfa7987.jpg?im_w=720",
    preview: true,
  },
  {
    address: "3101 Watson Lake Park Rd, 86301",
    url: "https://a0.muscache.com/im/pictures/eedbe6a4-3ac5-47d5-bbf8-f4c373de05b0.jpg?im_w=1200",
    preview: true,
  },
  {
    address: "3101 Watson Lake Park Rd, 86301",
    url: "https://a0.muscache.com/im/pictures/16634524-0dfd-428c-8b17-d2e817032430.jpg?im_w=720",
    preview: true,
  },
  {
    address: "3101 Watson Lake Park Rd, 86301",
    url: "https://a0.muscache.com/im/pictures/b3bcddca-1adb-4357-8cde-7652af0ebd46.jpg?im_w=1200",
    preview: true,
  },
  {
    address: "2555 Savannah Ave, 77640",
    url: "https://a0.muscache.com/im/pictures/36aee6b3-0be2-48d3-9d7c-d9b3525650fa.jpg?im_w=1200",
    preview: true,
  },
  {
    address: "2555 Savannah Ave, 77640",
    url: "https://a0.muscache.com/im/pictures/093ec409-fefc-42e0-a2ba-1c43f024a94a.jpg?im_w=720",
    preview: true,
  },
  {
    address: "2555 Savannah Ave, 77640",
    url: "https://a0.muscache.com/im/pictures/88568bce-74b1-47ae-8e74-b58f23e68a8c.jpg?im_w=720",
    preview: true,
  },
  {
    address: "2555 Savannah Ave, 77640",
    url: "https://a0.muscache.com/im/pictures/d4476dd8-5851-4d0d-b5fa-5e2de592fcbd.jpg?im_w=1200",
    preview: true,
  },
  {
    address: "2555 Savannah Ave, 77640",
    url: "https://a0.muscache.com/im/pictures/f8f85c01-ee53-4770-878a-7d8f765209a2.jpg?im_w=720",
    preview: true,
  },
  {
    address: "2555 Savannah Ave, 77640",
    url: "https://a0.muscache.com/im/pictures/04777f39-20e5-4f8e-bef1-00d856ca3cf2.jpg?im_w=720",
    preview: true,
  },
  {
    address: "R. do Alto da Veiga 4910, 4910-339",
    url: "https://a0.muscache.com/im/pictures/74252939/6e004cce_original.jpg?im_w=720",
    preview: true,
  },
  {
    address: "R. do Alto da Veiga 4910, 4910-339",
    url: "https://a0.muscache.com/im/pictures/74252597/6b3f57d5_original.jpg?im_w=720",
    preview: true,
  },
  {
    address: "R. do Alto da Veiga 4910, 4910-339",
    url: "https://a0.muscache.com/im/pictures/74252480/0cdcd692_original.jpg?im_w=720",
    preview: true,
  },
  {
    address: "R. do Alto da Veiga 4910, 4910-339",
    url: "https://a0.muscache.com/im/pictures/74252860/cc41279d_original.jpg?im_w=720",
    preview: true,
  },
  {
    address: "R. do Alto da Veiga 4910, 4910-339",
    url: "https://a0.muscache.com/im/pictures/74254026/10df6a90_original.jpg?im_w=720",
    preview: true,
  },
  {
    address: "R. do Alto da Veiga 4910, 4910-339",
    url: "https://a0.muscache.com/im/pictures/b0b7f1e0-df92-4d9c-8cb3-99f5f70550c2.jpg?im_w=720",
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
        [Sequelize.Op.startsWith]: "https://a0.muscache.com/im/pictures/",
      },
    });
  },
};
