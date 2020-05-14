const express = require('express');
const router = express.Router();

router.use('/recipe', require('./recipeController'));
router.use('/recipes', require('./recipesController'));
router.use('/files', require('./filesController'));

module.exports = router;
