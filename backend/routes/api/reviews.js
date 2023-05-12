const router = require("express").Router();
const { Review, ReviewImage } = require("../../db/models");
const { verifyAuth } = require("../../services/auth.server");
const { invariant } = require("../../services/error.server");

router.get("/current", verifyAuth, async (req, res) => {
  const userId = req.user.id;

  const reviews = await Review.findAll({ where: { userId } });
  res.json(reviews);
});

router.post("/:reviewId/images", verifyAuth, async (req, res, next) => {
  const userId = req.user.id;
  const { url } = req.body;
  const { reviewId } = req.params.reviewId;

  const review = await Review.findByPk(reviewId, {
    attributes: ["userId"],
  });

  const images = await ReviewImage.Count({ where: { reviewId } });

  if (review.userId === userId) {
    return next({
      message: "User already has a review for this spot",
    });
  } else if (!review) {
    return next({ message: "Review couldn't be found" });
  } else if (images === 10) {
    return next({
      message: "Maximum number of images for this resource was reached",
    });
  }

  const newReview = await ReviewImage.create({
    reviewId,
    url,
  });

  res.json(newReview);
});

router.put("/:reviewId", verifyAuth, async (req, res) => {
  const { review, stars } = req.body;
  const userId = req.user.id;

  if (!review || !stars) {
    return next({
      message: "Bad Request",
      errors: {
        review: "Review text is required",
        stars: "Stars must be an integer from 1 to 5",
      },
      status: 400,
    });
  }

  const reviewToUpdate = await Review.findByPk(req.params.reviewId, {
    where: { userId },
  });

  if (!reviewToUpdate) {
    return next({ message: "Review couldn't be found", status: 404 });
  }

  reviewToUpdate.review = review;
  reviewToUpdate.stars = stars;
  await reviewToUpdate.save();

  res.json(reviewToUpdate);
});

router.delete("/:reviewId", verifyAuth, async (req, res) => {
  const userId = req.user.id;

  const review = await Review.findByPk(req.params.reviewId, {
    where: { userId },
  });
  invariant(review, "Review couldn't be found");

  await review.destroy();
  res.json({ message: "Successfully deleted" });
});

module.exports = router;
