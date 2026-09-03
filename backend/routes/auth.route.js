const express = require("express");
const { reqister, login } = require("../controller/auth.controller");
const router = express.Router();

router.post("/auth/register", reqister);
router.post("/auth/login", login);
module.exports = router;
