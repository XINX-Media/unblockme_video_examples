const express = require("express");

// import the database init function
const { st } = require("./models/db");
const routes = require('./routes');

const app = express();

const port = process['env']['PORT'] || 8080;

app.use(express.json());

app.use('/', routes);

// init database before starting app
st().then(() => {
    app['listen'](port, () => {
        console.log(`Listening on http://localhost:${port}`);
    });
});
