const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "output");

const now = (new Date()).toLocaleString();

fs.appendFileSync(filePath, `Script was run at ${now}\n`);