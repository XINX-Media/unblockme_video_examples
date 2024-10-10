require("dotenv").config({ path: __dirname + "/../.env"});
const { Connection } = require("@bucky24/database");
const ObjectModel = require("./object");

async function init() {
    const connection = await Connection.mysqlConnection({
        host: process.env.DB_HOST,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    });
    Connection.setDefaultConnection(connection);

    await ObjectModel.init();
}

module.exports = {
    init,
    ObjectModel,
};