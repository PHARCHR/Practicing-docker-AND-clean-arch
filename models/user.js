const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "Please  enter you email"],
    minlength: 3,
    maxlength: 50,
    match: [
      /^(?!\.)[\w\.-]{1,64}@(?!-)[a-zA-Z\d-]{1,63}(?<!-)\.[a-zA-Z]{2,}$/,
      "Please enter a valid email adress",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 6,
    maxlength: 12,
  },
});
UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
UserSchema.methods.generateToken = function () {
  return jwt.sign({ userName: this.name, id: this._id }, process.env.JWT_KEY, {
    expiresIn: process.env.TOKEN_EXPIRY,
  });
};
UserSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}
module.exports = mongoose.model("User", UserSchema);
