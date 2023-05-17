const { getAllSpots, createSpot, getCurrentUsersSpots } = require("./lib");
const { verifyAuth } = require("../../../services/auth.server");
const router = require("express").Router();

const idRouter = require("./id");

router.get("/", getAllSpots);
router.post("/", verifyAuth, createSpot);
router.get("/current", verifyAuth, getCurrentUsersSpots);
router.use("/:spotId", idRouter);

module.exports = router;
