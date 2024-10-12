require("dotenv").config({ path: __dirname + "/../.env" });

const { Connection : Co } = require("@bucky24/database");
// import the tracker model
const TrackerModel = require("./trackerModel");
// import the tracker hit model
const TrackerHitModel = require("./trackerHitModel");

async function st() {
    // create new connection from mysql
    const mysqlConnection = await Co.mysqlConnection({
        // the host from process env
        host: process.env.DB_HOST,
        // the username from process
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    });
    // set default connection
    Co.setDefaultConnection(mysqlConnection);

    await TrackerModel.init();
    await TrackerHitModel.init();
}

module.exports = {
    st,
    TrackerModel,
    TrackerHitModel,
};