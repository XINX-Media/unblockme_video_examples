const router = require('express').Router();

const userRoutes = require('./userRoutes.js');
const postRoutes = require('./postRoutes.js');

router.use('/users', userRoutes);
router.use('/post', postRoutes);

module.exports = router;