const express = require('express');
const router = express.Router();
const controller = require('../controllers')

router.get('/:id', controller.findOrCreate);
router.get('/', controller.getGames);
router.post('/', controller.saveGame);

module.exports = router;