const { User } = require("../../../db/models");
const {
  throwIfError,
  throwError,
} = require("../../../services/error.server");

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

const logout = (_, res) => {
  res.clearCookie("token");
  return res.json({ message: "success" });
};

const validLogin = ({ credential, password }) => {
  let errorResult = {
    message: "Invalid credentials",
    errors: {},
    status: 500,
  };
  if (!credential) {
    errorResult.errors.credential = "Email or username is required";
  }
  if (!password) {
    errorResult.errors.password = "Password is required";
  }
  throwIfError(errorResult);
  return { credential, password };
};

const login = async (req, res) => {
  try {
    const { credential, password } = validLogin(req.body);

    const data = await User.unscoped().findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential,
        },
      },
    });

    let passwordMatch;
    if (data) {
      passwordMatch = compareSync(
        password,
        data.hashedPassword.toString()
      );
    }

    if (!data || !passwordMatch) {
      throwError(401, "Invalid credentials");
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
  } catch (err) {
    returnError(err, res);
  }
};

const validSignUp = async ({
  firstName,
  lastName,
  email,
  password,
  username,
}) => {
  let errorResult = {
    message: "Bad Request",
    errors: {},
    status: 400,
  };
  if (!firstName) {
    errorResult.errors.firstName = "First Name is required";
  }
  if (!lastName) {
    errorResult.errors.lastName = "Last Name is required";
  }
  if (!email) {
    errorResult.errors.email = "Invalid email";
  }
  if (!password) {
    errorResult.errors.password = "Password is required";
  }
  if (!username) {
    errorResult.errors.username = "Username is required";
  }
  throwIfError(errorResult);
  await checkIfAvailable({ email, username });
  return { firstName, lastName, email, password, username };
};

const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, username } =
      await validSignUp(req.body);

    const hashedPassword = hashSync(password);
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
  } catch (err) {
    returnError(err, res);
  }
};

module.exports = {
  sessionRouter: require("./session"),
  usersRouter: require("./users"),
  user: { getAllUsers, signup },
  session: {
    getUser,
    login,
    logout,
  },
};
