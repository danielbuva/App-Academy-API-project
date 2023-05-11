const {
  restoreCsrf,
  restoreSession,
  verifyAuth,
} = require("../../services/auth.server");
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const spotsRouter = require("./spots.js");
const reviewsRouter = require("./reviews");
const bookingsRouter = require("./bookings");
const router = require("express").Router();

const returnUser = (req, res) => {
  return res.json(req.user);
};

router.use(restoreSession);
router.use("/session", sessionRouter);
router.use("/users", usersRouter);
router.use("/spots", spotsRouter);
router.use("/reviews", reviewsRouter);
router.use("/bookings", bookingsRouter);

router.get("/require-auth", verifyAuth, returnUser);

router.get("/csrf/restore", restoreCsrf);

router.post("/test", function (req, res) {
  res.json({ requestBody: req.body });
});

module.exports = router;
