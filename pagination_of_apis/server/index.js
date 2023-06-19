const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const data = [
    { name: "Computer Science" },
    { name: "Art" },
    { name: "Business" },
    { name: "Economics" },
    { name: "History" },
    { name: "Art History" },
    { name: "German" },
    { name: "Social Studies" },
    { name: "Law" },
    { name: "Basket Making" },
    { name: "Spanish" },
    { name: "Computer Engineering" },
];

app.get("/v1", (req, res) => {
    res.json(data);
});

app.get("/v2", (req, res) => {
    let { page, page_count } = req.query;
    if (page === undefined) {
        page = 0;
    }
    if (page_count === undefined) {
        page_count = 5;
    }

    const results = [];
    for (let i=0;i<page_count;i++) {
        const index = i + page * page_count;
        results.push(data[index]);
    }

    res.json(results);
});

app.listen(9090, () => {
    console.log("Listening");
});