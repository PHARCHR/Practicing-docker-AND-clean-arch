require("dotenv").config();
require("express-async-errors");
const authentication=require("./middleWares/authentication")
const connect = require("./db/connectdb");
const authRouter = require("./routes/authRoutes");
const jobRouter = require("./routes/jobsRoutes");
const notFoundMiddleware = require("./middleWares/notFound");
const errorHandlerMiddleware = require("./middleWares/errorHandlerMiddleware");
const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
//routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs",authentication,jobRouter);

//error handling middlewares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = () => {
  try {
    connect(process.env.MONGO_URI);
    app.listen(port, console.log(`Server listening on port ${port}`));
  } catch (error) {
    console.log(error, "Couldn't spin up the server");
  }
};
start();
