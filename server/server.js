const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = express.Router();
const PORT = 4000;
const multer = require('multer');

let Recipe = require('./models/recipe.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/our_recipes', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log('MongoDB database connection established successfully!');
});

routes.route('/').get(function(req, res) {
    Recipe.find(function(err, recipes) {
        if (err) {
            console.log(err);
        } else {
            res.json(recipes);
        }
    });
});

routes.route('/add').post(function(req, res) {
    let newRecipe = new Recipe(req.body);
    newRecipe.save()
        .then(recipe => {
            res.status(200).json({'recipe' : 'recipe added successfully'});
        })
        .catch(err => {
            res.status(400).send('creating a new recipe failed');
        });
});

const storage = multer.diskStorage({
    destination: "public/images/",
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({storage: storage}).single('recipeImage');
routes.route('/uploadImage').post(function(req, res) {
    upload(req, res, (err) => {
        if(!err) {
            return res.send(200).end();
        }
    });
});

app.use('/recipes', routes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
