const { Connection } = require("@bucky24/database");

const UserModel = require("./user");

async function initDb() {
    const connection = await Connection.fileConnection("../data");
    Connection.setDefaultConnection(connection);

    await UserModel.init();
}

module.exports = { initDb, UserModel };