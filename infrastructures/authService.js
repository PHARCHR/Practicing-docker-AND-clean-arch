const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class AuthServices {
  hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  };

  comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
  };
  generateToken = (name, id) => {
    const token = jwt.sign({ userName: name, id }, process.env.JWT_KEY, {
      expiresIn: process.env.TOKEN_EXPIRY,
    });
    return token;
  };
}

module.exports = AuthServices;
