const { ValidationError } = require("sequelize");

const { isProduction } = require("../config");

const notFoundHandler = (_, _, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = { message: "The requested resource couldn't be found." };
  err.status = 404;
  next(err);
};

const sqlValidationHandler = (err, _, _, next) => {
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

const errorFormatter = (err, _, res, _) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || "Server Error",
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack,
  });
};

const invariant = (condition, message, next) => {
  if (!condition) {
    next({ status: 404, title: "Resource Not Found", message });
  }
};

const updateSpotInvariant = (conditions, next) => {
  for (let i = 0; i < conditions.length; i++) {
    if (!conditions[i]) {
      next({
        status: 400,
        message: "Bad Request",
        errors: {
          address: "Street address is required",
          city: "City is required",
          state: "State is required",
          country: "Country is required",
          lat: "Latitude is not valid",
          lng: "Longitude is not valid",
          name: "Name must be less than 50 characters",
          description: "Description is required",
          price: "Price per day is required",
        },
      });
    }
  }
};

const reviewInvariant = (conditions, next) => {
  for (let i = 0; i < conditions.length; i++) {
    if (!conditions[i]) {
      next({
        message: "Bad Request",
        errors: {
          review: "Review text is required",
          stars: "Stars must be an integer from 1 to 5",
        },
      });
    }
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
