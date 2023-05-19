const { verifyAuth } = require("../../../services/auth.server");
const { getCurrentUsersBookings } = require("./lib");
const router = require("express").Router();
const bookingId = require("./id");

router.use(verifyAuth);
router.get("/current", getCurrentUsersBookings);
router.use("/:bookingId", bookingId);

module.exports = router;
