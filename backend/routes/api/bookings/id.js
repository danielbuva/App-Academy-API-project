const { bookings } = require("./lib");

const router = require("express").Router();

router.put("/", bookings.edit);
router.delete("/", bookings.delete);

module.exports = router;
