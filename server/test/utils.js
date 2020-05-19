// * Helper functions for use ONLY in testing

const mongoose = require('mongoose');
const Recipe = require('../models/recipe.model');

const initEmptyDb = async () => {
    await Recipe.createCollection();
    await Recipe.deleteMany({});
};

const cleanupDb = async () => {
    const { connection } = mongoose;

    await connection.dropDatabase().then(
        _res => {},
        _err => console.log('Error: could not drop database')
    );
};
};

module.exports = {
    initEmptyDb: initEmptyDb,
    cleanupDb: cleanupDb,
    exampleRecipe1: exampleRecipe1
};
