const express = require("express");
const router = express.Router();
const { register, signin } = require("../handlers/auth");

router.post("/signup", register);
router.post("/signin", signin);

module.exports = router;