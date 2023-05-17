const {
  SpotImage,
  ReviewImage,
  Spot,
  Review,
} = require("../../db/models");
const {
  invariant,
  checkAuthorization,
} = require("../../services/error.server");
const { verifyAuth } = require("../../services/auth.server");
const router = require("express").Router();

router.delete("/spot-images/:imageId", verifyAuth, async (req, res) => {
  const spotImage = await SpotImage.findByPk(req.params.imageId);
  invariant(spotImage, "Spot Image couldn't be found");

  const spot = await Spot.findByPk(spotImage.spotId);
  checkAuthorization(spot);

  await spotImage.destroy();
  res.json({ message: "Successfully deleted" });
});

router.delete("review-images/:imageId", verifyAuth, async (req, res) => {
  const reviewImage = await ReviewImage.findByPk(req.params.imageId);
  invariant(reviewImage, "Review Image couldn't be found");

  const review = await Review.findByPk(reviewImage.reviewId);
  checkAuthorization(review);

  await reviewImage.destroy();
  res.json({ message: "Successfully deleted" });
});

module.exports = router;
