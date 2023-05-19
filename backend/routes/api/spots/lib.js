const {
  invariant,
  checkAuthorization,
  reviewInvariant,
  throwError,
  returnError,
} = require("../../../services/error.server");

const {
  Booking,
  Review,
  ReviewImage,
  Spot,
  SpotImage,
  User,
} = require("../../../db/models");

const {
  validateBooking,
  validateQuery,
} = require("../../../services/validation.server");
const { verifyAuth } = require("../../../services/auth.server");

const { validSpot } = require("../../../services/error.server");

const { fn, col } = require("sequelize");

const addSpotImage = async (req, res) => {
  const { url, preview } = req.body;
  const spotId = req.params.spotId;

  const spot = await Spot.findByPk(spotId);
  try {
    invariant(spot);
    checkAuthorization(spot.ownerId === req.user.id);

    const newImage = await SpotImage.create({ spotId, url, preview });
    res.json({
      id: newImage.id,
      url: newImage.url,
      preview: newImage.preview,
    });
  } catch (err) {
    returnError(err, res);
  }
};

const editSpot = async (req, res) => {
  try {
    const spot = await Spot.findByPk(req.params.spotId);
    invariant(spot);
    checkAuthorization(spot.ownerId === req.user.id);

    await spot.update({
      ...validSpot(req.body),
    });

    res.json(spot);
  } catch (err) {
    returnError(err, res);
  }
};

const deleteSpot = async (req, res) => {
  try {
    const spot = await Spot.findByPk(req.params.spotId);
    invariant(spot);
    checkAuthorization(spot.ownerId === req.user.id);

    await spot.destroy();
    res.json({ message: "Successfully deleted" });
  } catch (err) {
    returnError(err, res);
  }
};

const getReview = async (req, res) => {
  try {
    console.log("TRYING");
    const spot = await Spot.findByPk(req.params.spotId, {
      attributes: ["id"],
    });
    invariant(spot);

    const Reviews = await Review.findAll({
      where: { spotId: spot.id },
      include: [
        { model: User, attributes: ["id", "firstName", "lastName"] },
        {
          model: ReviewImage,
          attributes: ["id", "url"],
        },
      ],
    });

    res.json({ Reviews });
  } catch (err) {
    console.log("CATCHING");
    returnError(err, res);
  }
};

const createReview = async (req, res, next) => {
  const { review, stars } = req.body;
  const spotId = parseInt(req.params.spotId);
  const userId = req.user.id;
  try {
    reviewInvariant({ review, stars });
    const spot = await Spot.findByPk(spotId, {
      attributes: ["id"],
    });
    invariant(spot);
    const reviewExists = await Review.findOne({
      where: { spotId, userId },
    });

    if (reviewExists) {
      throwError(500, "User already has a review for this spot");
    }

    const newReview = await Review.create({
      review,
      stars,
      spotId,
      userId,
    });
    res.status(201).json(newReview);
  } catch (err) {
    returnError(err, res);
  }
};

const getBooking = async (req, res) => {
  const spotId = req.params.spotId;
  let options;

  try {
    const spot = await Spot.findByPk(spotId);
    invariant(spot);

    const userIsTheOwner = spot.ownerId === req.user.id;
    if (userIsTheOwner) {
      options = {
        where: { spotId },
        include: [
          { model: User, attributes: ["id", "firstName", "lastName"] },
        ],
      };
    } else {
      options = {
        where: { spotId },
        attributes: ["spotId", "startDate", "endDate"],
      };
    }

    const Bookings = await Booking.findAll(options);
    res.json({ Bookings });
  } catch (err) {
    returnError(err, res);
  }
};

const createBooking = async (req, res) => {
  const { startDate, endDate } = req.body;
  const spotId = req.params.spotId;
  const userId = req.user.id;

  try {
    const spot = await Spot.findByPk(spotId);
    invariant(spot);
    checkAuthorization(spot.ownerId !== userId);
    await validateBooking(startDate, endDate, spotId);

    const newBooking = await Booking.create({
      spotId,
      userId,
      startDate,
      endDate,
    });

    await newBooking.reload({
      attributes: { include: ["id"] },
    });

    res.json(newBooking);
  } catch (err) {
    returnError(err, res);
  }
};

const getSpot = async (req, res) => {
  try {
    const spotId = req.params.spotId;
    const spot = await Spot.findOne({
      where: { id: spotId },
    });
    invariant(spot);

    const [SpotImages, reviews, Owner] = await Promise.all([
      SpotImage.findAll({
        where: { spotId },
        attributes: ["id", "url", "preview"],
      }),
      Review.findAll({
        where: { spotId },
        attributes: ["stars"],
      }),
      User.findOne({
        where: { id: spot.ownerId },
        attributes: ["id", "username", "email"],
        as: "Owner",
      }),
    ]);

    const numRating = reviews.length;
    const avgStarRating =
      numRating > 0
        ? reviews.reduce((sum, review) => sum + review.stars, 0) /
          numRating
        : 0;

    res.json({
      ...spot.toJSON(),
      numRating,
      avgStarRating,
      SpotImages,
      Owner,
    });
  } catch (err) {
    returnError(err, res);
  }
};

const getAllSpots = async (req, res) => {
  const options = validateQuery(req.query);

  try {
    const [spots, avgRatings, spotImages] = await Promise.all([
      Spot.findAll(options),
      Review.findAll({
        attributes: ["spotId", [fn("AVG", col("stars")), "avgRating"]],
        group: ["spotId"],
      }),
      SpotImage.findAll({
        attributes: ["spotId", "url"],
        order: [["createdAt", "DESC"]],
      }),
    ]);

    const Spots = spots.map((spot) => {
      const spotId = spot.id;

      const avgRatingObj = avgRatings.find(
        (rating) => rating.spotId === spotId
      );
      const avgRating = avgRatingObj
        ? avgRatingObj.get("avgRating")
        : null;

      const imageObj = spotImages.find((image) => image.spotId === spotId);
      const previewImage = imageObj ? imageObj.get("url") : null;

      return {
        ...spot.toJSON(),
        avgRating,
        previewImage,
      };
    });

    res.json({ Spots });
  } catch (err) {
    returnError(err, res);
  }
};

const getCurrentUsersSpots = async (req, res) => {
  try {
    const Spots = await Spot.findAll({
      where: { ownerId: req.user.id },
      attributes: {
        include: [
          [fn("AVG", col("Reviews.stars")), "avgRating"],
          [fn("MAX", col("SpotImages.url")), "previewImage"],
        ],
      },
      include: [
        { model: SpotImage, attributes: [] },
        { model: Review, attributes: [] },
      ],
      group: ["Spot.id"],
    });

    res.json({ Spots });
  } catch (err) {
    returnError(err, res);
  }
};

const createSpot = async (req, res) => {
  try {
    const newSpot = await Spot.create({
      ownerId: req.user.id,
      ...validSpot(req.body),
    });

    res.status(201).json(newSpot);
  } catch (err) {
    returnError(err, res);
  }
};

module.exports = {
  createSpot,
  getAllSpots,
  getCurrentUsersSpots,
  spotId: {
    addSpotImage: [verifyAuth, addSpotImage],
    createBooking: [verifyAuth, createBooking],
    createReview: [verifyAuth, createReview],
    deleteSpot: [verifyAuth, deleteSpot],
    editSpot: [verifyAuth, editSpot],
    getBooking: [verifyAuth, getBooking],
    getReview,
    getSpot,
  },
};
