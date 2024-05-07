const { Router } = require("express");
const { AuthRouter } = require("./auth");
const { UserRouter } = require("./users");
const authMiddleWare = require("../middlewares/authMiddleware");
const { Logger, log } = require("winston");
const winston = require("winston");

const AppRouter = Router();

AppRouter.use("/auth", AuthRouter);
// TODO: Die Users Router soll die auth Middleware durchlaufen
AppRouter.use("/users", authMiddleWare, UserRouter);

AppRouter.use("/users", UserRouter);

module.exports = { AppRouter };
