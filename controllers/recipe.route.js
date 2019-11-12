const express = require('express');
const router = express.Router();

const Recipe = require('../models/recipe.model');
const cloudinary = require('./cloudinary');
const IncomingForm = require('formidable').IncomingForm;

router.route('').get(function(req, res) {
    Recipe.find(function(err, recipes) {
        if (err) {
            console.log(err);
        } else {
            res.status(200).json(recipes);
        }
    });
});

router.route('/add').post(function(req, res) {
    let newRecipe = new Recipe(req.body);
    newRecipe
        .save()
        .then(recipe => {
            res.status(200).json({
                status: 'recipe added successfully',
                objectID: newRecipe._id
            });
        })
        .catch(err => {
            res.status(400).send('creating a new recipe failed');
        });
});

router.route('/update/:id').post(function(req, res) {
    Recipe.findById(req.params.id, function(err, recipe) {
        if (err || !recipe) {
            res.status(404).send('Recipe not found');
        } else {
            newRecipe = req.body;
            recipe.title = newRecipe.title;
            recipe.subtitle = newRecipe.subtitle;
            recipe.method = newRecipe.method;
            recipe.ingredients = newRecipe.ingredients;
            recipe.prepTime = newRecipe.prepTime;
            recipe.cookTime = newRecipe.cookTime;

            recipe
                .save()
                .then(recipe => {
                    res.status(200).json({
                        status: 'recipe updated successfully',
                        recipe: recipe
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.status(400).send('Failed to update recipe');
                });
        }
    });
});

router.route('/uploadImage').post(function(req, res) {
    // upload file to cloudinary
    IncomingForm().parse(req, (err, fields, files) => {
        if (err) {
            console.log(err);
        }

        cloudinary.uploader.upload(
            files['recipeImage'].path,
            { unique_filename: true, folder: 'recipes' },
            (err, image) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ status: 'upload failed' });
                }
                res.status(200).json({
                    status: 'image upload successful',
                    imageUrl: image.url,
                    imageId: image.public_id
                });
            }
        );
    });

    // return filename
});

router.route('/delete/:id').post(async function(req, res) {
    var recipeId = req.params.id;
    const recipeToDelete = await Recipe.findById(recipeId, 'imageUrl imageId', {
        lean: true
    });
    const recipeImageId = recipeToDelete.imageId;

    Recipe.deleteOne({ _id: recipeId }, function(err) {
        if (!err) {
            // send delete image request to cloudinary
            if(recipeImageId) {
                cloudinary.uploader.destroy(recipeImageId, (error, result) => {
                    if(error) {
                        res.status(400).send('image not deleted');
                    }
                });
            }
            res.status(200).send('recipe deleted successfully');
        } else {
            res.status(400).send('error deleting recipe');
        }
    });
});

module.exports = router;