const bcrypt = require("bcryptjs");

const HttpStatus = require("../utils/httpStatusCodes");
const throwError = require("../utils/errorObject");
const toSafeUser = require("../utils/safeUserObject");
const generateToken = require("../utils/generateToken");

const userRepo = require("../repositories/userRepository");

const registerUser = async (req, res, next) => {
  try {
    console.log(req.url);

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
    
    const token = await generateToken(newUser);
    if (!token) {
      return next(throwError("Server is facing some issues!", HttpStatus.INTERNAL_SERVER_ERROR));
    }
    
    res.status(HttpStatus.CREATED).json({
      success: true,
      message: "New user registered successfully!",
      data: {
        user: toSafeUser(newUser),
        token,
      },
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
      return next(
        throwError("Password does not match", HttpStatus.UNAUTHORIZED)
      );
    }

    const token = await generateToken(user);
    if (!token) {
      return next(throwError("Server is facing some issues!", HttpStatus.INTERNAL_SERVER_ERROR));
    }

    res.status(HttpStatus.OK).json({
      success: true,
      message: `Welcome ${user.name}`,
      data: {
        user: toSafeUser(user),
        token,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return next(throwError("User ID is null", HttpStatus.BAD_REQUEST));
    }
    const user = await userRepo.findById(id);

    if (!user) {
      return next(throwError("User not found", HttpStatus.NOT_FOUND));
    }

    res.status(HttpStatus.OK).json({
      success: true,
      message: "User found!",
      data: toSafeUser(user),
    });
  } catch (err) {
    next(err);
  }
};

// ADMIN CONTROLLERS

const getAllUser = async (req, res, next) => {
  try {
    const users = await userRepo.findAll();

    res.status(HttpStatus.OK).json({
      success: true,
      message: "Fetched all users!",
      data: users
    })
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return next(throwError("ID is null!", HttpStatus.BAD_REQUEST));
    }
  
    const deletedUser = await userRepo.deleteOne(id);
    if (!deletedUser) {
      return next(throwError("User is either deleted or was never present!", HttpStatus.NOT_FOUND));
    }

    res.status(HttpStatus.OK).json({
      success: true,
      message: "User was deleted successfully",
      data: deleteUser
    })
  } catch (err) {
    next(err)
  }
}

module.exports = { registerUser, loginUser, getUser, getAllUser, deleteUser };
