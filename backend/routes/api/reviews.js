const {
  invariant,
  checkAuthorization,
  throwIfError,
  throwError,
} = require("../../services/error.server");
const {
  Review,
  ReviewImage,
  Spot,
  SpotImage,
  User,
} = require("../../db/models");
const { verifyAuth } = require("../../services/auth.server");
const router = require("express").Router();

router.get("/current", verifyAuth, async (req, res) => {
  const reviews = await Review.findAll({
    where: { userId: req.user.id },
    include: [
      { model: User, attributes: ["id", "firstName", "lastName"] },
      { model: Spot, attributes: { exclude: ["createdAt", "updatedAt"] } },
      { model: ReviewImage, attributes: ["id", "url"] },
    ],
  });

  const spotImages = await SpotImage.findAll({
    attributes: ["spotId", "url"],
    order: [["createdAt", "DESC"]],
  });

  const Reviews = reviews.map((review) => {
    const spotId = review.Spot.id;

    const imageObj = spotImages.find((image) => image.spotId === spotId);
    const previewImage = imageObj ? imageObj.get("url") : null;

    return {
      ...review.toJSON(),
      Spot: {
        ...review.Spot.toJSON(),
        previewImage,
      },
    };
  });

  res.json({ Reviews });
});

router.post("/:reviewId/images", verifyAuth, async (req, res) => {
  const reviewId = req.params.reviewId;

  const review = await Review.findByPk(reviewId, {
    attributes: ["userId"],
  });
  invariant(review, "Review couldn't be found");
  checkAuthorization(review.userId === req.user.id);

  const images = await ReviewImage.count({ where: { reviewId } });
  if (images === 10) {
    throwError(
      403,
      "Maximum number of images for this resource was reached"
    );
  }

  const newReview = await ReviewImage.create({
    reviewId,
    url: req.body.url,
  });

  res.json({ id: newReview.id, url: newReview.url });
});

router.put("/:reviewId", verifyAuth, async (req, res) => {
  const errorResult = { errors: {}, message: "Bad Request", status: 400 };
  const { review, stars } = req.body;

  if (!review) {
    errorResult.errors.review = "Review text is required";
  }
  if (!stars) {
    errorResult.errors.stars = "Stars must be an integer from 1 to 5";
  }
  throwIfError(errorResult);

  const reviewToUpdate = await Review.findByPk(req.params.reviewId);
  invariant(reviewToUpdate, "Review couldn't be found");
  checkAuthorization(reviewToUpdate.userId === req.user.id);

  reviewToUpdate.review = review;
  reviewToUpdate.stars = stars;
  await reviewToUpdate.save();

  res.json(reviewToUpdate);
});

router.delete("/:reviewId", verifyAuth, async (req, res) => {
  const review = await Review.findByPk(req.params.reviewId);
  invariant(review, "Review couldn't be found");
  checkAuthorization(review.userId === req.user.id);

  await review.destroy();
  res.json({ message: "Successfully deleted" });
});

module.exports = router;
