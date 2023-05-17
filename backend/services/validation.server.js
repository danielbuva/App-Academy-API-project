const { validationResult } = require("express-validator");
const { throwIfError } = require("./error.server");
const { Booking } = require("../db/models");
const { setOptions } = require("../utils");

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
  if (minLng && isNaN(parseInt(minLng))) {
    errorResult.errors.minLng = "Minimum longitude is invalid";
  }
  if (maxLng && isNaN(parseInt(maxLng))) {
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
  throwIfError(errorResult);

  return setOptions({
    page,
    size,
    minLat,
    maxLat,
    minLng,
    maxLng,
    minPrice,
    maxPrice,
  });
};

const validateBooking = async (startDate, endDate, spotId) => {
  let errorResult = {
    errors: {},
    message: "Sorry, this spot is already booked for the specified dates",
    status: 403,
  };

  const bookingsBySpotId = await Booking.findAll({ where: { spotId } });

  for (let i = 0; i < bookingsBySpotId.length; i++) {
    const startDateConflicts =
      startDate > bookingsBySpotId[i].startDate &&
      startDate < bookingsBySpotId[i].endDate;
    const endDateConflicts =
      endDate < bookingsBySpotId[i].endDate &&
      endDate > bookingsBySpotId[i].startDate;
    if (startDateConflicts) {
      errorResult.errors.startDate =
        "Start date conflicts with an existing booking";
    }
    if (endDateConflicts) {
      errorResult.errors.endDate =
        "End date conflicts with an existing booking";
    }
  }
  throwIfError(errorResult);
};

const throwError = (status, message) => {
  const error = new Error(message);
  error.status = status;
  throw error;
};

module.exports = {
  handleValidationErrors,
  throwError,
  validateBooking,
  validateQuery,
};
