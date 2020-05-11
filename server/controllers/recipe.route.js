const express = require('express');
const router = express.Router();

const Recipe = require('../models/recipe.model');
const cloudinary = require('./cloudinary');
const IncomingForm = require('formidable').IncomingForm;

const PUBLIC_DIR = '../client/public';
const IMAGES_DIR = PUBLIC_DIR + '/images/';
const multer = require('multer');
const fs = require('fs');

router.route('').get((req, res) => {
    Recipe.find((err, recipes) => {
        if (err) {
            console.log(err);
            res.status(400).json({ status: 'Error fetching recipes' });
        }
        res.status(200).json(recipes);
    });
});

router.route('/add').post((req, res) => {
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
            res.status(400).json({ status: 'creating a new recipe failed' });
        });
});

router.route('/update/:id').post((req, res) => {
    Recipe.updateOne({ _id: req.params.id }, req.body, err => {
        if (err) {
            res.status(400).json({ status: 'Failed to update recipe' });
        }

        res.status(200).json({ status: 'Recipe updated successfully' });
    });
});

const storage = multer.diskStorage({
    destination: IMAGES_DIR,
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage }).single('recipeImage');
router.route('/uploadImage').post((req, res) => {
    if (process.env.ENV === 'DEV') {
        // save file locally
        upload(req, res, err => {
            if (err) {
                res.status(400).json({ status: 'image upload failed' });
            }

            const fileName = req.file.originalname;
            res.status(200).json({
                ok: 'true',
                status: 'image upload success',
                imageUrl: '/images/' + fileName,
                imageId: fileName
            });
        });
    } else {
        // upload file to cloudinary
        IncomingForm().parse(req, (err, fields, files) => {
            if (err) {
                console.log(err);
                res.status(400).json({
                    status: 'Parsing error when saving image'
                });
            }

            cloudinary.uploader.upload(
                files['recipeImage'].path,
                { unique_filename: true, folder: 'recipes' },
                (error, image) => {
                    if (error) {
                        console.log(error);
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
    }
});

router.route('/delete/:id').post(async (req, res) => {
    var recipeId = req.params.id;
    const recipeToDelete = await Recipe.findById(recipeId, 'imageUrl imageId', {
        lean: true
    });
    const recipeImageId = recipeToDelete.imageId;
    const recipeImagePath = PUBLIC_DIR + recipeToDelete.imageUrl;

    Recipe.deleteOne({ _id: recipeId }, err => {
        if (err) {
            res.status(400).json({ status: 'error deleting recipe' });
        }

        if (recipeImageId) {
            if (process.env.ENV === 'DEV') {
                // delete locally stored file
                fs.unlink(recipeImagePath, error => {
                    if (error) {
                        res.status(400).json({
                            status: 'error deleting recipe image'
                        });
                    }
                });
            } else {
                // send delete image request to cloudinary
                cloudinary.uploader.destroy(recipeImageId, (error, result) => {
                    if (error) {
                        res.status(400).json({
                            status: 'image not deleted'
                        });
                    }
                });
            }
        }

        res.status(200).json({ status: 'recipe deleted successfully' });
    });
});

module.exports = router;
