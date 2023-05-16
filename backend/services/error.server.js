const { ValidationError } = require("sequelize");
const { isProduction } = require("../config");

const invariant = (condition, message = "Spot couldn't be found") => {
  if (!condition) {
    throw { status: 404, title: "Resource Not Found", message };
  }
};

const notFoundHandler = (_, __, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = { message: "The requested resource couldn't be found." };
  err.status = 404;
  next(err);
};

const sqlValidationHandler = (err, _, __, next) => {
  if (err instanceof ValidationError) {
    let errors = {};
    for (let error of err.errors) {
      errors[error.path] = error.message;
    }
    err.title = "Validation error";
    err.errors = errors;
  }
  next(err);
};

const errorFormatter = (err, _, res, __) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || "Server Error",
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack,
  });
};

const updateSpotInvariant = ({
  address,
  city,
  country,
  lat,
  lng,
  name,
  description,
  price,
}) => {
  let errorResult = { errors: {}, message: "Bad Request", status: 400 };
  if (!address) {
    errorResult.errors.address = "Street address is required";
  }
  if (!city) {
    errorResult.errors.city = "City is required";
  }
  if (!country) {
    errorResult.errors.country = "Country is required";
  }
  if (!lat) {
    errorResult.errors.lat = "Latitude is not valid";
  }
  if (!lng) {
    errorResult.errors.lng = "Longitude is not valid";
  }
  if (!name) {
    errorResult.errors.name = "Name must be less than 50 characters";
  }
  if (!description) {
    errorResult.errors.description = "Description is required";
  }
  if (!price) {
    errorResult.errors.price = "Price per day is required";
  }
  if (Object.keys(errorResult.errors).length > 0) {
    throw errorResult;
  }
};

const reviewInvariant = ({ review, stars }) => {
  let errorResult = { errors: {}, message: "Bad Request", status: 400 };
  if (!review) {
    errorResult.errors.review = "Review text is required";
  }
  if (!stars || stars > 5 || stars < 1) {
    errorResult.errors.stars = "Stars must be an integer from 1 to 5";
  }
  if (Object.keys(errorResult.errors).length > 0) {
    throw errorResult;
  }
};

module.exports = {
  notFoundHandler,
  sqlValidationHandler,
  errorFormatter,
  invariant,
  updateSpotInvariant,
  reviewInvariant,
};
