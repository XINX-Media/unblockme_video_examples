const { Router } = require("express");
const tracker_routes = require("./tracker");
const user_routes = require("./user");

const apiRouter = new Router();

apiRouter.use('/tracker', tracker_routes);
apiRouter.use("/user", user_routes);

module.exports = apiRouter;

