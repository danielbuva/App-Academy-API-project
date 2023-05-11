const router = require("express").Router();
const { Booking } = require("../../db/models");
const { verifyAuth } = require("../../services/auth.server");
const { Op } = require("sequelize");
const { invariant } = require("../../services/error.server");

router.get("/current", verifyAuth, async (req, res) => {
  const userId = req.user.id;

  const bookings = await Booking.findAll({ where: { userId } });
  res.json(bookings);
});

router.put("/:bookingId", verifyAuth, async (req, res, next) => {
  const { startDate, endDate } = req.body;
  const userId = req.user.id;

  //@TODO: add date validation helper function from review router
  //@TODO: add date conflicts validation helper function
  //@TODO: add date past validation helper function

  const booking = await Booking.findByPk(req.params.bookingId, {
    where: { userId },
  });

  invariant(booking, "Booking couldn't be found", next);

  booking.startDate = startDate;
  booking.endDate = endDate;
  await booking.save();

  res.json(booking);
});

router.delete("/:bookingId", verifyAuth, async (req, res, next) => {
  const userId = req.user.id;
  const booking = await Booking.findByPk(req.params.bookingId, {
    where: userId,
  });
  invariant(booking, "Booking coudn't be found", next);

  if (booking.startDate === "") {
    //@TODO: add handling for bookings that have started already
    next({
      message: "Bookings that have been started can't be deleted",
      status: 403,
    });
  }

  res.json({ message: "Successfully deleted" });
});

module.exports = router;
