const express = require("express");
const router = express.Router();

const { registerUser, loginUser, getUser, getAllUser, deleteUser } = require("../controllers/userController.js");
const registerAdmin = require("../controllers/adminController.js");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:id", getUser);

// ADMIN ROUTES
router.post("/admin/login", registerAdmin);
router.get("/", getAllUser);
router.delete("/", deleteUser);

module.exports = router;
