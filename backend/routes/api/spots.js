const {
  Spot,
  Review,
  Booking,
  User,
  SpotImage,
  ReviewImage,
} = require("../../db/models");
const {
  invariant,
  updateSpotInvariant,
  reviewInvariant,
  checkAuthorization,
} = require("../../services/error.server");
const {
  validateQuery,
  validateBooking,
} = require("../../services/validation.server");
const { verifyAuth } = require("../../services/auth.server");
const { fn, col } = require("sequelize");
const router = require("express").Router();

router.get("/", async (req, res) => {
  let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } =
    req.query;

  const options = validateQuery({
    page,
    size,
    minLat,
    maxLat,
    minLng,
    maxLng,
    minPrice,
    maxPrice,
  });

  const spots = await Spot.findAll(options);

  const avgRatings = await Review.findAll({
    attributes: ["spotId", [fn("AVG", col("stars")), "avgRating"]],
    group: ["spotId"],
  });

  const spotImages = await SpotImage.findAll({
    attributes: ["spotId", "url"],
    order: [["createdAt", "DESC"]],
  });

  const Spots = spots.map((spot) => {
    const spotId = spot.id;

    const avgRatingObj = avgRatings.find(
      (rating) => rating.spotId === spotId
    );
    const avgRating = avgRatingObj
      ? avgRatingObj.get("avgRating").toFixed(1)
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
});

router.get("/current", verifyAuth, async (req, res) => {
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
});

router.get("/:spotId", async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId, {
    include: [
      { model: SpotImage },
      { model: Review, attributes: [] },
      {
        model: User,
        attributes: ["id", "username", "email"],
        as: "Owner",
      },
    ],
    attributes: {
      include: [
        [fn("count", col("Reviews.stars")), "numRating"],
        [fn("AVG", col("Reviews.stars")), "avgStarRating"],
      ],
      group: ["Spot.id"],
    },
  });

  invariant(spot.id);

  res.json(spot);
});

router.post("/", verifyAuth, async (req, res) => {
  const {
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  } = req.body;

  updateSpotInvariant({
    address,
    city,
    country,
    lat,
    lng,
    name,
    description,
    price,
  });

  const newSpot = await Spot.create({
    ownerId: req.user.id,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  });

  res.status(201).json(newSpot);
});

router.post("/:spotId/images", verifyAuth, async (req, res) => {
  const { url, preview } = req.body;
  const spotId = req.params.spotId;

  const spot = await Spot.findByPk(spotId);
  invariant(spot);
  checkAuthorization(spot.ownerId === req.user.id);

  const newImage = await SpotImage.create({ spotId, url, preview });
  res.json({
    id: newImage.id,
    url: newImage.url,
    preview: newImage.preview,
  });
});

router.put("/:spotId", verifyAuth, async (req, res) => {
  const {
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  } = req.body;

  const spot = await Spot.findByPk(req.params.spotId);
  invariant(spot);
  checkAuthorization(spot.ownerId === req.user.id);

  updateSpotInvariant({
    address,
    city,
    country,
    lat,
    lng,
    name,
    description,
    price,
  });

  await spot.update({
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  });

  res.json(spot);
});

router.delete("/:spotId", verifyAuth, async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId);
  invariant(spot);
  checkAuthorization(spot.ownerId === req.user.id);

  await spot.destroy();
  res.json({ message: "Successfully deleted" });
});

router.get("/:spotId/reviews", async (req, res) => {
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
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    ],
  });

  res.json({ Reviews });
});

router.post("/:spotId/reviews", verifyAuth, async (req, res, next) => {
  const { review, stars } = req.body;
  const spotId = parseInt(req.params.spotId);
  const userId = req.user.id;
  console.log({ review, stars });
  reviewInvariant({ review, stars });

  const spot = await Spot.findByPk(spotId, {
    attributes: ["id"],
  });
  console.log({ spot });
  invariant(spot);

  const reviewExists = await Review.findOne({
    where: { spotId, userId },
  });

  if (reviewExists) {
    return next({
      message: "User already has a review for this spot",
    });
  }

  const newReview = await Review.create({ review, stars, spotId, userId });

  res.status(201).json(newReview);
});

router.get("/:spotId/bookings", verifyAuth, async (req, res, next) => {
  const userId = req.user.id;
  const { spotId } = req.params;
  let options;

  const userIsTheOwner = await Spot.find({
    where: { ownerId: userId, id: spotId },
  });

  if (userIsTheOwner.id) {
    options = { where: { spotId }, include: User };
  } else {
    options = {
      where: { spotId },
      attributes: ["spotId", "startDate", "endDate"],
    };
  }
  const Bookings = await Booking.findAll(options);
  invariant(Bookings);

  res.json({ Bookings });
});

router.post("/:spotId/bookings", verifyAuth, async (req, res, next) => {
  const { startDate, endDate } = req.body;
  const spotId = req.paramsspotId;
  const userId = req.user.id;

  const spot = await Spot.findByPk(spotId);
  invariant(spot);
  checkAuthorization(spot.ownerId !== userId);
  validateBooking(startDate, endDate, spotId);

  const newBooking = await Booking.create({
    spotId,
    userId,
    startDate,
    endDate,
  });

  res.json(newBooking);
});

module.exports = router;
