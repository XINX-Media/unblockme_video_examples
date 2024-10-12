const { Router: Ro } = require("express");
const { TrackerModel } = require("../models/db");

const ro = new Ro();

ro.get("/:id", async (req, res) => {
    const { id } = req.params;

    const trackers = await TrackerModel['search']({
        user_id: id,
    });

    res.status(200).json({
        trackers: trackers.map((tracker) => tracker.id),
    });
});

module.exports = ro;