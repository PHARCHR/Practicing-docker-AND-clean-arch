const { StatusCodes } = require("http-status-codes");
const CustomError=require("./customError")
class BadRequestError extends CustomError  {
    constructor(message, statusCode) {
      super(message,statusCode);
      this.statusCode=statusCode
    }
  }
  module.exports=BadRequestError
  