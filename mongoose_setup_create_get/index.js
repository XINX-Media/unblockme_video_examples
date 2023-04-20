require("dotenv").config();
const express = require('express');

const userRoutes = require('./routes/user');
const connection = require('./config/connection');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());

app.use('/api/user', userRoutes);

connection.once("open", () => {
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
});