const {
  checkAuthorization,
  invariant,
  throwError,
  returnError,
} = require("../../../services/error.server");
const { validateBooking } = require("../../../services/validation.server");
const { Booking, Spot, SpotImage } = require("../../../db/models");
const { today, remapToAddSpotImage } = require("../../../utils");

const getValidBooking = async (req) => {
  const booking = await Booking.findOne({
    attributes: ["id"],
    where: { id: req.params.bookingId },
  });
  invariant(booking, "Booking couldn't be found");
  console.log("booking found, checking auth...");
  checkAuthorization(booking.userId === req.user.id);

  return booking;
};

const deleteBookingById = async (req, res) => {
  try {
    const booking = await getValidBooking(req);
    const bookingConflicts =
      booking.startDate <= today() && booking.endDate >= today();

    if (bookingConflicts) {
      throwError(402, "Bookings that have been started can't be deleted");
    }

    await booking.destroy();
    res.json({ message: "Successfully deleted" });
  } catch (err) {
    returnError(err, res);
  }
};

const editBookingById = async (req, res) => {
  const { startDate, endDate } = req.body;
  try {
    console.log("trying...");
    const booking = await getValidBooking(req);

    await Promise.all([
      validateBooking(startDate, endDate, booking.spotId, booking.endDate),
      booking.update(req.body),
    ]);

    res.json(booking);
  } catch (err) {
    returnError(err, res);
  }
};

const getCurrentUsersBookings = async (req, res) => {
  const [bookings, spotImages] = await Promise.all([
    Booking.findAll({
      where: { userId: req.user.id },
      attributes: { include: ["id"] },
      include: [
        {
          model: Spot,
          attributes: {
            exclude: ["createdAt", "updatedAt", "description"],
          },
        },
      ],
    }),
    SpotImage.findAll(),
  ]);

  const Bookings = remapToAddSpotImage(bookings, spotImages);
  res.json({ Bookings });
};

module.exports = {
  bookings: {
    delete: deleteBookingById,
    edit: editBookingById,
  },
  getCurrentUsersBookings,
};
