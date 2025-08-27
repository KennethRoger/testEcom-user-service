const express = require("express");
const router = express.Router();

const { registerUser, loginUser, getUser, getAllUser } = require("../controllers/userController.js");

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/:id", getUser);

router.get("/", getAllUser);

module.exports = router;
