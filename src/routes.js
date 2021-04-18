const express = require("express");
const userRoutes = require("./user/userRoutes");
const apiRouter = express.Router();

apiRouter.use("/user", userRoutes());

module.exports = apiRouter;
