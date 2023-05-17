const { handleValidationErrors } = require("./validation.server");
const { jwtConfig, isProduction } = require("../config");
const { hashSync, compareSync } = require("bcryptjs");
const { throwIfError } = require("./error.server");
const { check } = require("express-validator");
const { User } = require("../db/models");
const { secret, expiresIn } = jwtConfig;
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

const setTokenCookie = (res, user) => {
  const token = jwt.sign(
    { data: user },
    secret,
    { expiresIn: parseInt(expiresIn) } // 604,800 seconds = 1 week
  );

  res.cookie("token", token, {
    maxAge: expiresIn * 1000, // in milliseconds
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
  });

  return token;
};

const restoreSession = (req, res, next) => {
  const { token } = req.cookies;
  req.user = null;

  return jwt.verify(token, secret, null, async (err, jwtPayload) => {
    if (err) {
      return next();
    }

    try {
      const { id } = jwtPayload.data;
      req.user = await User.findByPk(id, {
        attributes: {
          include: ["email", "createdAt", "updatedAt"],
        },
      });
    } catch (e) {
      res.clearCookie("token");
      return next();
    }

    if (!req.user) res.clearCookie("token");

    return next();
  });
};

const verifyAuth = (req, _, next) => {
  if (req.user) return next();

  const err = new Error("Authentication required");
  err.title = "Authentication required";
  err.errors = { message: "Authentication required" };
  err.status = 401;
  return next(err);
};

const restoreCsrf = (req, res) => {
  const csrfToken = req.csrfToken();
  res.cookie("XSRF-TOKEN", csrfToken);
  res.status(200).json({
    "XSRF-Token": csrfToken,
  });
};

const getAllUsers = async (_, res) => {
  const users = await User.findAll();
  res.json(users);
};

const getUser = (req, res) => {
  const { user } = req;
  if (user) {
    const data = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
    };
    return res.json({
      user: data,
    });
  } else return res.json({ user: null });
};

const signup = async (req, res) => {
  let errorResult = {
    errors: {},
    message: "User already exists",
    status: 500,
  };
  const { firstName, lastName, email, password, username } = req.body;
  const hashedPassword = hashSync(password);

  const emailExists = await User.findOne({ where: { email } });
  if (emailExists) {
    errorResult.errors.email = "User with that email already exists";
  }
  const usernameExists = await User.findOne({ where: { username } });
  if (usernameExists) {
    errorResult.errors.username = "User with that username already exists";
  }
  throwIfError(errorResult);

  const data = await User.create({
    firstName,
    lastName,
    email,
    username,
    hashedPassword,
  });

  const user = {
    id: data.id,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    username: data.username,
  };

  setTokenCookie(res, user);

  return res.json({ user });
};

const login = async (req, res, next) => {
  const { credential, password } = req.body;

  const data = await User.unscoped().findOne({
    where: {
      [Op.or]: {
        username: credential,
        email: credential,
      },
    },
  });

  const passwordMatch = compareSync(
    password,
    data.hashedPassword.toString()
  );

  if (!data || !passwordMatch) {
    const err = new Error("Login failed");
    err.status = 401;
    err.title = "Login failed";
    err.errors = { credential: "The provided credentials were invalid." };
    return next(err);
  }

  const user = {
    id: data.id,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    username: data.username,
  };

  setTokenCookie(res, user);

  return res.json({ user });
};

const logout = (_, res) => {
  res.clearCookie("token");
  return res.json({ message: "success" });
};

const validateLogin = [
  check("credential")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Please provide a valid email or username."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password."),
  handleValidationErrors,
];

const validateSignup = [
  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("First Name is required"),
  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Last Name is required"),
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username")
    .not()
    .isEmail()
    .withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

module.exports = {
  restoreCsrf,
  restoreSession,
  session: {
    getUser,
    login: [validateLogin, login],
    logout,
  },
  user: { getAllUsers, signup: [validateSignup, signup] },
  verifyAuth,
};
