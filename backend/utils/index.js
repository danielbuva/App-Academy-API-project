const { Op } = require("sequelize");

const today = () => {
  const date = new Date();
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

const setOptions = ({
  page,
  size,
  minLat,
  maxLat,
  minLng,
  maxLng,
  minPrice,
  maxPrice,
}) => {
  let options = { where: {} };

  page = page ?? 1;
  size = size ?? 20;
  options.limit = size;
  options.offset = (page - 1) * size;

  if (minLat && maxLat) {
    options.where.lat = {
      [Op.and]: [{ [Op.gte]: minLat }, { [Op.lte]: maxLat }],
    };
  } else if (minLat) {
    options.where.lat = { [Op.gte]: minLat };
  } else if (maxLat) {
    options.where.lat = { [Op.lte]: maxLat };
  }

  if (minLng && maxLng) {
    options.where.lng = {
      [Op.and]: [{ [Op.gte]: minLng }, { [Op.lte]: maxLng }],
    };
  } else if (minLng) {
    options.where.lng = { [Op.gte]: minLng };
  } else if (maxLng) {
    options.where.lng = { [Op.lte]: maxLng };
  }

  if (minPrice && maxPrice) {
    options.where.price = {
      [Op.and]: [{ [Op.gte]: minPrice }, { [Op.lte]: maxPrice }],
    };
  } else if (minPrice) {
    options.where.price = { [Op.gte]: minPrice };
  } else if (maxPrice) {
    options.where.price = { [Op.lte]: maxPrice };
  }

  return { options, page, size };
};

const remapToAddSpotImage = (table, spotImages) => {
  return table.map((record) => {
    const imageObj = spotImages.find(
      (image) => image.spotId === record.spotId
    );
    const previewImage = imageObj ? imageObj.url : null;

    return {
      ...record.toJSON(),
      Spot: {
        ...record.Spot.toJSON(),
        previewImage,
      },
    };
  });
};

const returnUser = (req, res) => {
  return res.json(req.user);
};

module.exports = {
  remapToAddSpotImage,
  returnUser,
  setOptions,
  today,
};
