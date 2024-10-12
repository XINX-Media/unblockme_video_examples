const { Model, FIELD_TYPE } = require("@bucky24/database");

const tracker_model = Model.create({
    table: 'tracker',
    fields: {
        uuid: {
            type: FIELD_TYPE['STRING'],
            length: 50,
        },
        user_id: {
            // the type of the user id
            type: FIELD_TYPE.INT,
        },
    },
    version: 1,
});

module.exports = tracker_model;