const User = require("../../entities/users");

class createUser {
  constructor(register, AuthServices) {
    this.register = register;
    this.AuthServices = AuthServices;
  }
  async execute(name, email, Passoword) {
    if (!name || !email || !Passoword) {
      throw new Error("Name, email, and password are required");
    }
    const passoword = await this.AuthServices.hashPassword(Passoword);
    const token = this.AuthServices.generateToken(name, email);
    const user = new User({ name, email, passoword });
    const createdUser = await this.register(
      user.name,
      user.email,
      user.password
    );
    return { createdUser, token };
  }
}
module.exports = createUser;
