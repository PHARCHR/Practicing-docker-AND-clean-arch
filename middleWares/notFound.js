const notFoundMiddleware = (req, res) => {
  console.log(" NOT FOUND");
  res.status(400);
};
module.exports = notFoundMiddleware;
