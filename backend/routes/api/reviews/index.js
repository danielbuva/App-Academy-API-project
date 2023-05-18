const { verifyAuth } = require("../../../services/auth.server");
const { getCurrentUsersReviews } = require("./lib");
const router = require("express").Router();
const idRouter = require("./id");

router.use(verifyAuth);
router.get("/current", getCurrentUsersReviews);
router.use("/:reviewId", idRouter);

module.exports = router;
