const { Router } = require("express");

const apiRouter = require("./api");

const mainRouter = Router();

mainRouter.use("/api", apiRouter);

module.exports = mainRouter;