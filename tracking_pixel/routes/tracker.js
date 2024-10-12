const { Router: ro} = require('express');
const uuid = require("uuid");
var Database = require("../models/db");
var TrackerModel = Database.TrackerModel;
const TH = Database.TrackerHitModel;

const trackerRoutes = new ro();

// route to create a new tracker
trackerRoutes.post('/', (req, res) => {
    const { user_id } = req.body;
    const newId = uuid.v4();

    const newTracker = {
        uuid: newId,
        user_id,
    };

    // create new tracker
    TrackerModel.insert(newTracker).then((re) => {
        res.json(re);
    });
});

trackerRoutes.get('/:id', async (req, res) => {
    const { id } = req['params'];

    const tracker = await TrackerModel['get'](id);

    if (null === tracker) {
        res.status(404).json({
            error: "Can't find tracker",
        });
    }

    const th = await TH.search({
        tracker_id: tracker.id,
    });

    tracker.hits = th.length;

    res.status(200).json({ tracker: tracker });
});

module.exports = trackerRoutes;