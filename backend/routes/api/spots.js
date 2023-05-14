const {
  invariant,
  updateSpotInvariant,
  reviewInvariant,
} = require("../../services/error.server");
const { validateQuery } = require("../../services/validation.server");
const { Spot, Review, Booking, User } = require("../../db/models");
const { verifyAuth } = require("../../services/auth.server");
const router = require("express").Router();
const { Op } = require("sequelize");

router.get("/", async (req, res) => {
  let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } =
    req.query;

  const options = validateQuery(
    page,
    size,
    minLat,
    maxLat,
    minLng,
    maxLng,
    minPrice,
    maxPrice
  );

  const Spots = await Spot.findAll(options);
  res.json({ Spots });
});

router.get("/current", verifyAuth, async (req, res) => {
  const usersSpots = await Spot.findAll({
    where: { ownerId: req.user.id },
  });

  res.json(usersSpots);
});

router.get("/:spotId", async (req, res) => {
  const spot = await Spot.findAll({
    where: { id: req.params.id },
  });

  res.json(spot);
});

router.post("/", verifyAuth, async (req, res, next) => {
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

  updateSpotInvariant(
    [address, city, country, lat, lng, name, description, price],
    next
  );

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

  res.json(newSpot);
});

router.post("/:spotId/images", verifyAuth, async (req, res) => {
  const { url, preview } = req.body;
  const spot = await Spot.findByPk(req.params.spotId);

  if (!spot) {
    res.status(404);
    return res.json({ message: "Spot couldn't be found" });
  }
  if (url) {
    spot.url = url;
  }
  if (preview) {
    spot.preview = preview;
  }

  await spot.save();

  res.json({ id: spot.id, url, preview });
});

router.put("/:spotId", verifyAuth, async (req, res, next) => {
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

  const spot = await Spot.findByPk(req.params.id, {
    where: { ownerId: req.user.id },
  });

  invariant(spot, "Spot couldn't be found", next);
  updateSpotInvariant(
    [address, city, country, lat, lng, name, description, price],
    next
  );

  spot.address = address;
  spot.city = city;
  spot.state = state;
  spot.country = country;
  spot.lat = lat;
  spot.lng = lng;
  spot.name = name;
  spot.description = description;
  spot.price = price;
  await spot.save();

  res.json(spot);
});

router.delete("/:spotId", verifyAuth, async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.spotId);
  invariant(spot, "Spot couldn't be found", next);
  await spot.destroy();

  res.json({ message: "Successfully deleted" });
});

router.get("/:spotId/reviews", async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.spotId, {
    attributes: ["id"],
  });
  invariant(spot, "Spot couldn't be found", next);

  const review = await Review.findOne({
    where: { spotId: spot.id },
  });

  res.json(review);
});

router.post("/:spotId/reviews", verifyAuth, async (req, res, next) => {
  const { review, stars } = req.body;
  const { spotId } = req.params;
  const userId = req.user.id;
  reviewInvariant([review, stars], next);

  const spot = await Spot.findByPk(spotId, {
    attributes: ["id"],
  });
  invariant(spot, "Spot couldn't be found", next);

  const reviewExists = await Review.findOne({
    where: { spotId, userId },
  });

  if (reviewExists) {
    return next({
      message: "User already has a review for this spot",
    });
  }

  const newReview = await Review.create({ review, stars, spotId, userId });

  res.json(newReview);
});

router.get("/:spotId/bookings", verifyAuth, async (req, res, next) => {
  const userId = req.user.id;
  const { spotId } = req.params;
  let options;

  const userIsTheOwner = await Spot.findAll({
    where: { ownerId: userId, spotId },
  });

  if (userIsTheOwner) {
    options = { where: { spotId }, include: User };
  } else {
    options = {
      where: { spotId, userId },
      attributes: ["spotId", "startDate", "endDate"],
    };
  }
  const bookings = await Booking.findAll(options);
  invariant(bookings, "Spot couldn't be found", next);

  res.json(bookings);
});

router.post("/:spotId/bookings", verifyAuth, async (req, res, next) => {
  const userId = req.user.id;
  const { startDate, endDate } = req.body;
  const { spotId } = req.params;

  const spot = await Spot.findByPk(spotId);
  invariant(spot, "Spot couldn't be found", next);

  // maybe add this to booking model validations -.-

  const bookingConflicts = await Booking.findAll({
    where: {
      spotId,
      [Op.or]: [
        {
          startDate: {
            [Op.between]: [startDate, endDate],
          },
        },
        {
          endDate: {
            [Op.between]: [startDate, endDate],
          },
        },
        {
          [Op.and]: [
            {
              startDate: {
                [Op.lte]: startDate,
              },
            },
            {
              endDate: {
                [Op.gte]: endDate,
              },
            },
          ],
        },
      ],
    },
  });

  if (bookingConflicts) {
    next({
      message: "Bad Request",
      errors: {
        endDate: "endDate cannot come before startDate",
      },
      status: 400,
    });
  }

  const newBooking = await Booking.create({
    spotId,
    userId,
    startDate,
    endDate,
  });

  res.json(newBooking);
});

module.exports = router;
