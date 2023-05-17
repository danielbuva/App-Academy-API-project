const { user } = require("../../services/auth.server");
const router = require("express").Router();

router.post("/", user.signup);

router.get("/", user.getAllUsers);

module.exports = router;
