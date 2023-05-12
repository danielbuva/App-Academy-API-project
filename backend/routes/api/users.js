const { signup, validateSignup } = require("../../services/auth.server");
const router = require("express").Router();

router.post("/", validateSignup, signup);

module.exports = router;
