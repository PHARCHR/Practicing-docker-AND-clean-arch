const BadRequestError = require("../error/badResquest");
const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.generateToken();
  res.status(StatusCodes.CREATED).json({ name: user.name, token });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please enter email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new BadRequestError("NO SUCH EMAIL");
  }
  const correctness = await user.isPasswordCorrect(password);
  if (!correctness) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ yo: { msg: "Incorrect credential" }, token });

    //throw new BadRequestError("INCORRECT PASSWORD");
  }
  const token = user.generateToken();
  res.status(StatusCodes.OK).json({ yo: { msg: "You have logged in" }, token });
};
module.exports = {
  register,
  login,
};
