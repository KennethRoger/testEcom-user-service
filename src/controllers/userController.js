const bcrypt = require("bcryptjs");

const throwError = require("../utils/errorObject");
const HttpStatus = require("../utils/httpStatusCodes");

const userRepo = require("../repositories/UserRepository");

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return next(throwError("Some data is missing!", HttpStatus.BAD_REQUEST));
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return next(throwError("Bad email format!", HttpStatus.BAD_REQUEST));
    }

    const existingUser = await userRepo.findOne({ email });
    if (existingUser) {
      return next(throwError("Email already exists!", HttpStatus.BAD_REQUEST));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userRepo.create({
      name,
      email,
      password: hashedPassword,
    });

    // Avoiding sending password
    const safeUser = { ...newUser, password: "" };

    res.status(HttpStatus.CREATED).json({
      success: true,
      message: "New user registered successfully!",
      data: safeUser,
    });
  } catch (err) {
    next(err);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
  } catch (err) {
    next(err);
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
  } catch (err) {}
};

const getAllUser = async (req, res) => {};

module.exports = { registerUser, loginUser, getUser, getAllUser };
