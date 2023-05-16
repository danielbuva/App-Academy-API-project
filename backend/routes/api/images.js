const {
  SpotImage,
  ReviewImage,
  Spot,
  Review,
} = require("../../db/models");
const { verifyAuth } = require("../../services/auth.server");
const {
  invariant,
  checkAuthorization,
} = require("../../services/error.server");
const router = require("express").Router();
const { Op } = require("sequelize");

router.delete("/spot-images/:imageId", verifyAuth, async (req, res) => {
  const spotImage = await SpotImage.findOne({
    attributes: ["id"],
    where: {
      id: req.params.imageId,
    },
  });
  invariant(spotImage, "Spot Image couldn't be found");

  const spot = await Spot.findOne({
    where: { id: spotImage.spotId, ownerId: req.user.id },
  });
  checkAuthorization(spot);

  await spotImage.destroy();
  res.json({ message: "Successfully deleted" });
});

router.delete("review-images/:imageId", verifyAuth, async (req, res) => {
  const reviewImage = await ReviewImage.findOne({
    where: { id: req.params.imageId },
  });
  invariant(reviewImage, "Review Image couldn't be found");

  const review = await Review.findOne({
    where: { id: reviewImage.reviewId, userId: req.user.id },
  });
  checkAuthorization(review);

  await reviewImage.destroy();
  res.json({ message: "Successfully deleted" });
});

module.exports = router;
