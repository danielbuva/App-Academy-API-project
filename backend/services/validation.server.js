const { validationResult } = require("express-validator");
const { Op, literal } = require("sequelize");

const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = {};
    validationErrors
      .array()
      .forEach((error) => (errors[error.param] = error.msg));

    const err = Error("Bad request.");
    err.errors = errors;
    err.status = 400;
    err.title = "Bad request.";
    next(err);
  }
  next();
};

const validateQuery = ({
  page,
  size,
  minLat,
  maxLat,
  minLng,
  maxLng,
  minPrice,
  maxPrice,
}) => {
  let errorResult = { errors: {}, message: "Bad Request", status: 400 };
  if (page && page < 1) {
    errorResult.errors.page = "Page must be greater than or equal to 1";
  }
  if (size && size < 1) {
    errorResult.errors.size = "Size must be greater than or equal to 1";
  }
  if (maxLat && isNaN(parseInt(maxLat))) {
    errorResult.errors.maxLat = "Maximum latitude is invalid";
  }
  if (minLat && isNaN(parseInt(minLat))) {
    errorResult.errors.minLat = "Minimum latitude is invalid";
  }
  if (minLng && isNaN(parseInt(minLng)) < 1) {
    errorResult.errors.minLng = "Minimum longitude is invalid";
  }
  if (maxLng && isNaN(parseInt(maxLng)) < 1) {
    errorResult.errors.maxLng = "Maximum longitude is invalid";
  }
  if (minPrice && minPrice < 0) {
    errorResult.errors.minPrice =
      "Minimum price must be greater than or equal to 0";
  }
  if (maxPrice && maxPrice < 0) {
    errorResult.errors.maxPrice =
      "Maximum price must be greater than or equal to 0";
  }
  if (Object.keys(errorResult.errors).length > 0) {
    throw errorResult;
  }

  let options = {
    where: {},
    attributes: {
      include: [
        [
          literal(
            "(SELECT AVG(stars) FROM Reviews WHERE Reviews.spotId = Spot.id)"
          ),
          "avgRating",
        ],
        [
          literal(
            "(SELECT url FROM SpotImages WHERE SpotImages.spotId = Spot.id ORDER BY createdAt DESC LIMIT 1)"
          ),
          "previewImage",
        ],
      ],
    },
  };

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

  return options;
};

module.exports = { handleValidationErrors, validateQuery };
