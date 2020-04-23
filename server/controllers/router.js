const express = require('express');
const router = express.Router();

router.use('/recipes', require('./recipe.route'))

module.exports = router;
