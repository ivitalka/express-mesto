const router = require('express').Router();
const getCards = require('../conrollers/cards');

router.get('/cards', getCards);

module.exports = router;
