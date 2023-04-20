const { Router } = require("express");
const { ObjectId } = require("mongodb");

const User = require("../models/user");

const userRoutes = Router();

userRoutes.post('/', (req, res) => {
    const { username, password, email } = req.body;

    User.create({
        username,
        password,
        email,
    }).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log("Error posting user: ", err);
        res.status(500).end(err);
    });
});

userRoutes.get('/:id', (req, res) => {
    const { id } = req.params;

    User.findOne({ _id: new ObjectId(id) })
    .then((result) => {
        res.json(result);
    });
});

userRoutes.get('/', (req, res) => {

    User.find({})
    .then((result) => {
        res.json(result);
    });
});

module.exports = userRoutes;