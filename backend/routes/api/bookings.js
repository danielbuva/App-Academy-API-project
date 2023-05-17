const {
  invariant,
  checkAuthorization,
} = require("../../services/error.server");
const { verifyAuth } = require("../../services/auth.server");
const { Booking, Spot } = require("../../db/models");
const { literal, Op } = require("sequelize");
const router = require("express").Router();
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
  const userId = req.user.id;

  const booking = await Booking.findOne({
    attributes: { include: ["id"] },
    where: { userId, id: req.params.bookingId },
  });
  invariant(booking, "Booking couldn't be found");
  if (booking.endDate >= today()) {
    throwError(403, "Past bookings can't be modified");
  } 
  const bookingConflicts = await Booking.findOne({
    where: {
      [Op.or]: [
        {
          startDate: {
            [Op.between]: [startDate, endDate],
          },
        },
        {
          endDate: {
            [Op.between]: [startDate, endDate],
          },
        },
        {
          [Op.and]: [
            {
              startDate: {
                [Op.lte]: startDate,
              },
            },
            {
              endDate: {
                [Op.gte]: endDate,
              },
            },
          ],
        },
      ],
      userId: { [Op.not]: userId },
    },
  });

  if (bookingConflicts) {
    return res.status(403).json({
      message:
        "Sorry, this spot is already booked for the specified dates",
      errors: {
        startDate: "Start date conflicts with an existing booking",
        endDate: "End date conflicts with an existing booking",
      },
    });
  }

  await booking.update({ startDate, endDate });
  res.json(booking);
});

router.delete("/:bookingId", verifyAuth, async (req, res, next) => {
  const booking = await Booking.findByPl(req.params.bookingId);
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
