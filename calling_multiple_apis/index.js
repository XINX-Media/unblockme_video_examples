const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const users = [
    {
        id: 1,
        name: 'Bob',
        age: 50,
    },
    {
        id: 2,
        name: 'Sandy',
        age: 62,
    },
];

app.get("/user_id_by_name", (req, res) => {
    const { name } = req.query;

    const user = users.find((user) => user.name === name);

    if (!user) {
        res.status(404).end();
        return;
    }

    res.status(200).json({
        id: user.id,
    });
});

app.get("/user_by_id", (req, res) => {
    const { id } = req.query;

    const user = users.find((user) => user.id == id);

    if (!user) {
        res.status(404).end();
        return;
    }

    res.status(200).json({
        user,
    });
});

app.listen(8080, () => {
    console.log("Listening on port 8080");
})