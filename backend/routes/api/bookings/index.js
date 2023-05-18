const { verifyAuth } = require("../../../services/auth.server");
const { getCurrentUsersBookings } = require("./lib");
const router = require("express").Router();
const idRouter = require("./id");

router.use(verifyAuth);
router.get("/current", getCurrentUsersBookings);
router.use("/:bookingId", idRouter);

module.exports = router;
