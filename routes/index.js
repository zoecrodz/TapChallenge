const express = require('express');
const router = express.Router();
const gameRoutes = require('./gameRoutes');

router.use('/game', gameRoutes);

module.exports = router;