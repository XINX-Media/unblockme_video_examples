const express = require("express");

const app = express();

const port = process.env.PORT || 3000;

app.use(express.static("./public"));

app.get("/me", (req, res) => {
    res.json({
        name: 'Robbert',
        age: 34.
    });
});

app.get("*", (req, res) => {
    res.json({
        error: "Bad api!",
    });
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});