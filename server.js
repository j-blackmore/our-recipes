require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = express.Router();
const PORT = process.env.PORT || 4000;
const IncomingForm = require('formidable').IncomingForm;
const path = require('path');
const cloudinary = require('cloudinary').v2;

const DB_URI = process.env.MONGODB_URI || 'mongodb://mongodb:27017/our_recipes';

let Recipe = require('./models/recipe.model');

app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'client', 'build')));

const dbConnect = () => {
    mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
};

dbConnect();
const connection = mongoose.connection;

connection.on('error', err => {
    console.log('There was a problem trying to connect to mongo');
    console.log('Retrying');
    setTimeout(() => dbConnect(), 5000);
});

connection.once('open', function() {
    console.log('MongoDB database connection established successfully!');
});

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

routes.route('').get(function(req, res) {
    Recipe.find(function(err, recipes) {
        if (err) {
            console.log(err);
        } else {
            res.status(200).json(recipes);
        }
    });
});

routes.route('/add').post(function(req, res) {
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

routes.route('/delete/:id').post(async function(req, res) {
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

routes.route('/update/:id').post(function(req, res) {
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

routes.route('/uploadImage').post(function(req, res) {
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

app.use('/recipes', routes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(PORT, function() {
    console.log('Server is running on Port: ' + PORT);
});
