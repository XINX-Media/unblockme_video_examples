const { Model, FIELD_TYPE, FIELD_META } = require("@bucky24/database");

const userModel = Model.create({
    table: "users",
    fields: {
        username: {
            type: FIELD_TYPE.STRING,
            meta: [FIELD_META.REQUIRED]
        },
        password: {
            type: FIELD_TYPE.STRING,
            meta: [FIELD_META.REQUIRED],
        },
        email: {
            type: FIELD_TYPE.STRING,
            meta: [FIELD_META.REQUIRED],
        },
        phone: {
            type: FIELD_TYPE.STRING,
            meta: [FIELD_META.REQUIRED],
        },
    },
    version: 1,
});

module.exports = userModel;