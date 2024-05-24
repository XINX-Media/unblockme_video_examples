const { Router } = require('express');

const apiRouter = Router();

const widgetRoutes = require('./widgetRoutes');

apiRouter.use('/widget', widgetRoutes);

module.exports = apiRouter;