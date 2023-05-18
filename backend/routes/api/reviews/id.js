const router = require("express").Router({ mergeParams: true });
const { review } = require("./lib.js");

router.post("/:reviewId/images", review.addImage);
router.put("/:reviewId", review.edit);
router.delete("/:reviewId", review.delete);

module.exports = router;
