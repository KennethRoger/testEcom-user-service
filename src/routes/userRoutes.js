const express = require("express");
const router = express.Router();

const { registerUser, loginUser, getUser } = require("../controllers/userController.js");
const auth = require("../middlewares/auth.js");

router.post("/register", registerUser);
router.post("/login", loginUser);

// router.get("/");
router.get("/:id", auth, getUser);

module.exports = router;
