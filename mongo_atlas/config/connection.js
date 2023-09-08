const { connect, connection } = require('mongoose');

const connectionURI = process.env.MONGODB_URI || "mongodb://localhost:27017/testDb";

connect(connectionURI);

module.exports = connection;