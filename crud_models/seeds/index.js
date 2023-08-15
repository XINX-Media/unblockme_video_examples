require("dotenv").config();
const sequelize = require('../config/connection');
const { Widget } = require("../models");
const randomString = require("../utils/randomString");
const randomInt = require("../utils/randomInt");

const WIDGET_COUNT = 10;

(async () => {
    await sequelize.sync({ force: true });

    // build random data
    const widgets = [];
    for (let i=0;i<WIDGET_COUNT;i++) {
        const name = randomString(20);
        const quantity = randomInt(0, 20);

        widgets.push({
            name,
            quantity,
        });
    }

    await Widget.bulkCreate(widgets);

    process.exit(0);
})();