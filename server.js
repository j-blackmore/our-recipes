const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = express.Router();
require("dotenv").config();
const PORT = process.env.PORT || 4000;
const multer = require('multer');
const fs = require('fs');
const path = require("path")

const DB_URI = process.env.MONGODB_URI || 'mongodb://mongodb:27017/our_recipes';

let Recipe = require('./models/recipe.model');

const imagesDir = "public/images/";

app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "client", "build")))

const dbConnect = () => {
    mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
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
    newRecipe.save()
        .then(recipe => {
            res.status(200).json({'status' : 'recipe added successfully', 'objectID': newRecipe._id});
        })
        .catch(err => {
            res.status(400).send('creating a new recipe failed');
        });
});

routes.route('/delete/:id').post(async function(req, res) {
    var recipeId = req.params.id;
    const recipeToDelete = await Recipe.findById(recipeId, 'imageUrl', {lean: true});
    const recipeImagePath = "public" + recipeToDelete.imageUrl;

    Recipe.deleteOne({_id: recipeId}, function(err) {
        if(!err) {
            fs.unlink(recipeImagePath, (err) => {
                if (err) console.log(err);
                else console.log(recipeImagePath + " was deleted successfully.");
            });
            res.status(200).send('recipe deleted');
        } else {
            res.status(400).send('error deleting recipe')
        }
    });
});

routes.route('/update/:id').post(function(req, res) {
    Recipe.findById(req.params.id, function(err, recipe) {
        if(err || !recipe) {
            res.status(404).send("Recipe not found");
        } else {
            newRecipe = req.body;
            recipe.title = newRecipe.title;
            recipe.subtitle = newRecipe.subtitle;
            recipe.method = newRecipe.method;
            recipe.ingredients = newRecipe.ingredients;
            recipe.prepTime = newRecipe.prepTime;
            recipe.cookTime = newRecipe.cookTime;

            recipe.save().then(recipe => {
                res.json({'status': 'recipe updated successfully', 'recipe': recipe});
            })
            .catch(err => {
                console.log(err);
                res.status(400).send("Failed to update recipe");
            });
        }
    });
});

const storage = multer.diskStorage({
    destination: imagesDir,
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({storage: storage}).single('recipeImage');
routes.route('/uploadImage').post(function(req, res) {
    upload(req, res, (err) => {
        if(!err) {
            return res.sendStatus(200);
        }
    });
});

app.use('/recipes', routes);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
