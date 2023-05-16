const { signup, validateSignup } = require("../../services/auth.server");
const router = require("express").Router();
const { User } = require("../../db/models");

router.post("/", validateSignup, signup);

router.get("/", async (_, res) => {
  const users = await User.findAll();
  res.json(users);
});

module.exports = router;
