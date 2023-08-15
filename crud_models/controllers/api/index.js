const { Router } = require("express");

const widget = require("./widget");

const router = Router();

router.use("/widget", widget);

module.exports = router;