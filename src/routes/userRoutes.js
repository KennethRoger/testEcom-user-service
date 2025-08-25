const express = require("express");
const router = express.Router();

const { registerUser, loginUser, getUser } = require("../controllers/userController.js")

router.post("/register", registerUser);
router.post("/login", loginUser);

// router.get("/");
router.get("/:id", getUser);

module.exports = router;
