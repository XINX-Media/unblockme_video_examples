const { Router } = require("express");

const { Name } = require('../../models');

const router = Router();

router.get('/', async (req, res) => {
    try {
        const names = await Name.find();

        res.status(200).json(names);
    } catch (err) {
        console.error(err);
        res.status(500).end();
    }
});

router.post('/', async (req, res) => {
    try {
        const { name } = req.body;
        const nameObj = await Name.create({ name });

        res.status(200).json(nameObj);
    } catch (err) {
        console.error(err);
        res.status(500).end();
    }
});

module.exports = router;