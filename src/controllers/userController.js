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

    const user = await userRepo.findOne({ email });
    if (!user) {
      return next(throwError("User does not exist", HttpStatus.UNAUTHORIZED));
    }

    const isPassValid = await bcrypt.compare(password, user.password);
    if (!isPassValid) {
      return next(throwError("Password does not match", HttpStatus.UNAUTHORIZED))
    }

    const safeUser = { name: user.name, email: user.email };

    res.status(HttpStatus.OK).json({
      success: true,
      message: `Welcome ${user.name}`,
      data: safeUser
    })

  } catch (err) {
    next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    
  } catch (err) {}
};

const getAllUser = async (req, res, next) => {};

module.exports = { registerUser, loginUser, getUser, getAllUser };
