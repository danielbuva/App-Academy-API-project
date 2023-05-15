const {
  SpotImage,
  ReviewImage,
  Spot,
  Review,
  User,
} = require("../../db/models");
const { verifyAuth } = require("../../services/auth.server");
const { invariant } = require("../../services/error.server");
const router = require("express").Router();
const { Op } = require("sequelize");

router.delete("/spot-images/:imageId", verifyAuth, async (req, res) => {
  const userId = req.user.id;
  const spotImage = await SpotImage.findOne({
    attributes: ["id"],
    where: {
      [Op.and]: [{ id: req.params.imageId }, { "$Spot.ownerId$": userId }],
    },
    include: {
      model: Spot,
      required: true,
      attributes: [],
    },
  });
  invariant(spotImage, "Spot Image couldn't be found");

  await spotImage.destroy();
  res.json({ message: "Successfully deleted" });
});

router.delete("review-images/:imageId", verifyAuth, async (req, res) => {
  const userId = req.user.id;
  const reviewImage = await ReviewImage.findByPk(req.params.imageId, {
    include: {
      model: Review,
      required: true,
      include: { model: User, required: true, where: { id: userId } },
    },
  });
  invariant(reviewImage, "Review Image couldn't be found");

  await reviewImage.destroy();

  res.json({ message: "Successfully deleted" });
});

module.exports = router;
