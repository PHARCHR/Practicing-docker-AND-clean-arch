const User = require("../../entities/users");

class loginUser {
  constructor(findOne, AuthService) {
    this.findOne = findOne;
    this.AuthService = AuthService;
  }
  async execute(email, Passoword) {
    if (!email || !Passoword) {
      throw new Error("Name, email, and password are required");
    }

    const user = await this.findOne({ email });
    if (!user) {
      throw new Error("invalid credentials");
    }
    const isPasswordValid = await this.AuthService.comparePassword(
      passoword,
      user.password
    );
    if (!isPasswordValid) {
      throw new Error("invalid credentials");
    }
    const token = this.AuthService.generateToken(user.name, user.id);
    return { user, token };
  }
}
module.exports = loginUser;
