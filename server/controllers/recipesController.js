const express = require('express');
const router = express.Router();

const Recipe = require('../models/recipe.model');

router.route('').get((req, res) => {
    Recipe.find((err, recipes) => {
        if (err) res.status(500).json({ status: 'Error fetching recipes' });

        res.status(200).json({ recipes: recipes });
    });
});

module.exports = router;
