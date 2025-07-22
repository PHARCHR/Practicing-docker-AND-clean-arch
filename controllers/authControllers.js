const BadRequestError = require("../error/badResquest");
// const User = require("../models/user");
const { register } = require("../inerfaces/repositories/userRepo");
const createUser = require("../useCase/user/createUser");
const  AuthServices = require("../infrastructures/authService");
const { findOne } = require("../inerfaces/repositories/userRepo");
const loginUser = require("../useCase/user/loginUser");

const AuthService = new AuthServices();
const { StatusCodes } = require("http-status-codes");
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new BadRequestError("Please enter name, email and password");
  }

  const create_user = new createUser(register, AuthService);

  const createdUser = await create_user.execute(name, email, password);
  if (!createdUser) {
    throw new BadRequestError("User creation failed");
  }

  // const user = await User.create({ ...req.body });
  // const token = user.generateToken();
  // res.status(StatusCodes.CREATED).json({ name: user.name, token });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please enter email and password");
  }
  const login_user = new loginUser(findOne, AuthService);
  const { user, token } = await login_user.execute(email, password);
  if (!user || !token) {
    throw new BadRequestError("Login failed");
  }
  res.status(StatusCodes.OK).json({
    name: user.name,
    token,
    message: "You have logged in successfully",
  });
  // const user = await User.findOne({ email });
  // if (!user) {
  //   throw new BadRequestError("NO SUCH EMAIL");
  // }
  // const correctness = await user.isPasswordCorrect(password);
  // if (!correctness) {
  //   res
  //     .status(StatusCodes.BAD_REQUEST)
  //     .json({ yo: { msg: "Incorrect credential" }, token });

  //   //throw new BadRequestError("INCORRECT PASSWORD");
  // }
  // const token = user.generateToken();
  // res.status(StatusCodes.OK).json({ yo: { msg: "You have logged in" }, token });
};
module.exports = {
  registerUser,
  login,
};
