const express = require('express');

const app = express();

app.use(express.json());

const allRoutes = require('./routes');

app.use('/', allRoutes);

module.exports = app;