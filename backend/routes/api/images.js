const { verifyAuth } = require("../../services/auth.server");
const {
  SpotImage,
  ReviewImage,
  Spot,
  Review,
  User,
} = require("../../db/models");
const { where } = require("sequelize");
const { invariant } = require("../../services/error.server");
const router = require("express").Router();

router.delete("/spot-images", verifyAuth, async (req, res, next) => {
  const userId = req.user.id;
  const spotImage = await SpotImage.findByPk(req.params.imageId, {
    include: {
      model: Spot,
      required: true,
      include: { model: User, required: true, where: { id: userId } },
    },
  });
  invariant(spotImage, "Spot Image couldn't be found", next);

  await spotImage.destroy();

  res.json({ message: "Successfully deleted" });
});

router.delete("review-images", verifyAuth, async (req, res, next) => {
  const userId = req.user.id;
  const reviewImage = await ReviewImage.findByPk(req.params.imageId, {
    include: {
      model: Review,
      required: true,
      include: { model: User, required: true, where: { id: userId } },
    },
  });
  invariant(reviewImage, "Review Image couldn't be found", next);

  await reviewImage.destroy();

  res.json({ message: "Successfully deleted" });
});

module.exports = router;
