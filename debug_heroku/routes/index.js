const  { Router } = require('express');
const jwt = require('jsonwebtoken');

const router = Router();

router.post('/login', async function (req, res) {
    try {
        const { username } = req.body;

        const token = await jwt.sign({
            username,
        }, process.env.JWT_KEY);

        res.status(200).json({
            token,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Something went wrong!",
        });
    }
});

module.exports = router;