const { verifyAuth } = require("../../services/auth.server");
const { invariant } = require("../../services/error.server");
const { Booking, Spot } = require("../../db/models");
const { literal } = require("sequelize");
const router = require("express").Router();

router.get("/current", verifyAuth, async (req, res) => {
  const userId = req.user.id;

  const Bookings = await Booking.findAll({
    where: { userId },
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

  //@TODO: add date validation helper function from review router
  //@TODO: add date conflicts validation helper function
  //@TODO: add date past validation helper function

  const booking = await Booking.findByPk(req.params.bookingId, {
    where: { userId },
  });

  invariant(booking, "Booking couldn't be found");

  booking.startDate = startDate;
  booking.endDate = endDate;
  await booking.save();

  res.json(booking);
});

router.delete("/:bookingId", verifyAuth, async (req, res) => {
  const userId = req.user.id;
  const booking = await Booking.findByPk(req.params.bookingId, {
    where: userId,
  });
  invariant(booking, "Booking coudn't be found");

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
