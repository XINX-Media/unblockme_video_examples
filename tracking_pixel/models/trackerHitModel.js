const { Model : Mo, FIELD_TYPE } = require("@bucky24/database");

const th = Mo.create({
    table: 'tracker_hit',
    // the fields for the table
    fields: {
        // the tracker id that was hit
        tracker_id: {
            // the type of the field
            type: FIELD_TYPE['INT'],
        },
    },
    version: 1,
});

module['exports'] = th;