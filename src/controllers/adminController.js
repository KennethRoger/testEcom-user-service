/* REGISTER ADMIN */
/* USED FOR TESTING PURPOSES */

const bcrypt = require("bcryptjs");

const HttpStatus = require("../utils/httpStatusCodes");
const throwError = require("../utils/errorObject");
const toSafeUser = require("../utils/safeUserObject");
const generateToken = require("../utils/generateToken");

const userRepo = require("../repositories/userRepository");


const registerAdmin = async (req, res, next) => {
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
      role: "admin",
      password: hashedPassword,
    });

    const token = await generateToken(newUser);
    if (!token) {
      return next(throwError("Server is facing some issues!", HttpStatus.INTERNAL_SERVER_ERROR));
    }

    res.status(HttpStatus.CREATED).json({
      success: true,
      message: "Admin registered successfully!",
      data: {
        user: toSafeUser(newUser),
        token,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = registerAdmin;