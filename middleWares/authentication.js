const jwt = require("jsonwebtoken");
const BadRequest = require("../error/badResquest");

const auth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization || !authorization.startsWith("Bearer")) {
    throw new BadRequest("You are not authorized");
  }
  const token = authorization.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_KEY);
    req.user = payload;
    next();
  } catch (error) {
    res.status(401).send("Unauthorized access");
  }
};
module.exports = auth;
