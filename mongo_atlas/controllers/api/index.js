const { Router } = require("express");

const nameRoutes = require('./nameRoutes');

const router = Router();

router.use('/name', nameRoutes);

module.exports = router;