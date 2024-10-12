// import path module
const path = require("path");
const { Router } = require('express');
const api_routes = require("./api");
const { TrackerModel, TrackerHitModel } = require("../models/db");

const mainRoute = new Router();

mainRoute.use('/api', api_routes);

mainRoute.use('/tracker/:uuid', function(req, res) {
    const { uuid } = req.params;

    TrackerModel.search({
        uuid,
    }).then(async (re) => {
        if (re.length !== 0) {
            await TrackerHitModel.insert({
                tracker_id: re[0].id,
            });
        }
        const ip = path.resolve(__dirname, "..", "assets", "pixel.png");

        res.sendFile(ip);
    });
});

module.exports = mainRoute;