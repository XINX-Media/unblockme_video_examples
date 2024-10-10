const { Model, FIELD_TYPE } = require("@bucky24/database");

const ObjectModel = Model.create({
    table: 'objects',
    fields: {
        string: {
            type: FIELD_TYPE.STRING,
            size: 100,
        },
    },
    version: 1,
});

module.exports = ObjectModel;