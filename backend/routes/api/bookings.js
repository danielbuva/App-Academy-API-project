const {
  invariant,
  checkAuthorization,
  throwError,
} = require("../../services/error.server");
const { validateBooking } = require("../../services/validation.server");
const { verifyAuth } = require("../../services/auth.server");
const { Booking, Spot } = require("../../db/models");
const router = require("express").Router();
const { literal } = require("sequelize");
const { today } = require("../../utils");

router.get("/current", verifyAuth, async (req, res) => {
  const Bookings = await Booking.findAll({
    where: { userId: req.user.id },
    attributes: { include: ["id"] },
    include: [
      {
        model: Spot,
        attributes: {
          exclude: ["createdAt", "updatedAt", "description"],
          include: [
            [
              literal(
                "(SELECT MAX(`SpotImages`.`url`) FROM `SpotImages` WHERE `Spot`.`id` = `SpotImages`.`SpotId`)"
              ),
              "previewImage",
            ],
          ],
        },
      },
    ],
  });
  res.json({ Bookings });
});

router.put("/:bookingId", verifyAuth, async (req, res) => {
  const { startDate, endDate } = req.body;

  const booking = await Booking.findOne({
    attributes: { include: ["id"] },
    where: { id: req.params.bookingId },
  });
  invariant(booking, "Booking couldn't be found");
  checkAuthorization(booking.userId === req.userId);

  await Promise.all([
    validateBooking(startDate, endDate, booking.spotId, booking.endDate),
    booking.update({ startDate, endDate }),
  ]);

  res.json(booking);
});

router.delete("/:bookingId", verifyAuth, async (req, res, next) => {
  const booking = await Booking.findByPk(req.params.bookingId);
  invariant(booking, "Booking coudn't be found");
  checkAuthorization(booking.userId === req.user.id);

  const bookingConflicts =
    booking.startDate <= today() && booking.endDate >= today();

  if (bookingConflicts) {
    throwError(402, "Bookings that have been started can't be deleted");
  }

  await booking.destroy();
  res.json({ message: "Successfully deleted" });
});

module.exports = router;
