const express = require("express");
const path = require("path");

const routes = require("./controllers");
const db = require("./config/connection");

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use('/', routes);

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`App listening on ${PORT}`);
    });
});