module.exports = function(req, res, next) {
    const auth = req.header("authentication");

    if (!auth) {
        return res.status(401).json({ message: "Not Authorized" });
    }

    if (auth !== "mytoken") {
        return res.status(401).json({ message: "Not Authorized" });
    }

    next();
};