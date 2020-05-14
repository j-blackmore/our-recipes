const express = require('express');
const router = express.Router();

const { removeLocally, cloudinaryRemove } = require('../services/filesService');
const Recipe = require('../models/recipe.model');

router.route('').post((req, res) => {
    let newRecipe = new Recipe(req.body.recipe);
    newRecipe
        .save()
        .then(() => {
            res.status(200).json({
                status: 'recipe added successfully'
            });
        })
        .catch(err => {
            res.status(500).json({ status: 'creating a new recipe failed' });
        });
});

router.route('/:id').put((req, res) => {
    Recipe.updateOne({ _id: req.params.id }, req.body, err => {
        if (err) {
            res.status(500).json({ status: 'Failed to update recipe' });
        }

        res.status(200).json({ status: 'Recipe updated successfully' });
    });
});

router.route('/:id').delete(async (req, res) => {
    const recipeId = req.params.id;
    const recipeToDelete = await Recipe.findById(recipeId, 'imageUrl imageId', {
        lean: true
    });
    const { imageId, imageUrl } = recipeToDelete;

    Recipe.deleteOne({ _id: recipeId }, err => {
        if (err) {
            res.status(500).json({ status: 'error deleting recipe' });
        }

        if (imageId) {
            if (process.env.ENV !== 'PROD') {
                const err = removeLocally(imageUrl);
            } else {
                const err = cloudinaryRemove(imageId);
            }

            if (err) {
                res.status(500).json({ status: 'error deleting recipe image' });
            }
        }

        res.status(200).json({ status: 'recipe deleted successfully' });
    });
});

module.exports = router;
