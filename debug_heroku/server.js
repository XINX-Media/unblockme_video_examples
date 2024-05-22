require("dotenv").config();
const express = require("express");

const port = process.env.PORT || 3001;

const app = express();

app.use(express.static("public"));
app.use(express.json());

const routes = require('./routes');

app.use('/', routes);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});