// * Helper functions for use ONLY in testing

const mongoose = require('mongoose');
const Recipe = require('../models/recipe.model');

const initEmptyDb = async () => {
    return Promise.all([
        await Recipe.createCollection(),
        await Recipe.deleteMany()
    ]);
};

const cleanupDb = async () => {
    const { connection } = mongoose;

    return await connection.dropDatabase().then(
        _res => {},
        _err => console.log('Error: could not drop database')
    );
};

const recipeData1 = {
    title: 'An example recipe',
    subtitle: 'the example subtitle',
    ingredients: ['1 thing', '2 lots of another'],
    method: 'lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    extras: [''],
    imageUrl: '',
    imageId: '',
    prepTime: 15,
    cookTime: 30,
    serves: 8,
    creator: 'test utils'
};

const exampleRecipe1 = {
    __v: 0,
    _id: '53ae89df26cb170382d41fc5',
    createdAt: JSON.parse(JSON.stringify(new Date('2020-01-01'))),
    ...recipeData1
};

const recipeData2 = {
    title: 'Second example recipe',
    subtitle: 'second subtitle description',
    ingredients: ['spoonful of one', 'something here'],
    method: 'lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    extras: [''],
    imageUrl: '',
    imageId: '',
    prepTime: 10,
    cookTime: 32,
    serves: 3,
    creator: 'test utils'
};

const exampleRecipe2 = {
    __v: 0,
    _id: '78ed24f619502abe58239ce6',
    createdAt: JSON.parse(JSON.stringify(new Date('2020-01-01'))),
    ...recipeData2
};

module.exports = {
    initEmptyDb: initEmptyDb,
    cleanupDb: cleanupDb,
    exampleRecipes: [exampleRecipe1, exampleRecipe2],
    recipeData: recipeData1
};