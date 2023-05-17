const { session } = require("../../services/auth.server");
const express = require("express");
const router = express.Router();

router.post("/", session.login);

router.delete("/", session.logout);

router.get("/", session.getUser);

module.exports = router;
