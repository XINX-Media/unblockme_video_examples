const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const header = req.headers.authorization;
    if (!header) {
        res.status(403).end();
        return;
    }

    const [_, token] = header.split(" ");
    const data = jwt.verify(token, process.env.JWT_KEY);

    if (!data) {
        res.status(403).end();
        return;
    }

    req.user = { id: data.id };
    next();
}