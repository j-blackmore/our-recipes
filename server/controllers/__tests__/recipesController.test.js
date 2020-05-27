const request = require('supertest');
const app = require('../../app');
const mongoDB = require('../mongoDB');
const Recipe = require('../../models/recipe.model');

const { initEmptyDb, exampleRecipes, cleanupDb } = require('../../test/utils');

beforeAll(async () => {
    return Promise.all([
        await mongoDB.connect((verbose = false)),
        await initEmptyDb()
    ]);
});

afterEach(async () => {
    return await initEmptyDb();
});

afterAll(async () => {
    return Promise.all([
        await cleanupDb(),
        await mongoDB.disconnect((verbose = false))
    ]);
});

const initRecipe = async recipe => await Recipe(recipe).save();

const initRecipes = async recipes => {
    await recipes.forEach(recipe => initRecipe(recipe));
};

describe('recipesController', () => {
    describe('/recipes', () => {
        test('GET returns empty array when no recipes exist', async () => {
            await request(app)
                .get('/recipes')
                .then(res => {
                    expect(res.statusCode).toEqual(200);
                    expect(res.body).toEqual({ recipes: [] });
                });
        });

        test('GET returns array of 1 element when 1 exists', async () => {
            await initRecipe(exampleRecipes[0]);
            await request(app)
                .get('/recipes')
                .then(res => {
                    expect(res.statusCode).toEqual(200);
                    expect(res.body).toEqual({ recipes: [exampleRecipes[0]] });
                });
        });

        test('GET returns array of multiple element when they exist', async () => {
            await initRecipes(exampleRecipes);
            await request(app)
                .get('/recipes')
                .then(res => {
                    expect(res.statusCode).toEqual(200);
                    expect(res.body).toEqual({ recipes: exampleRecipes });
                });
        });

        test('POST fails and returns 404', async () => {
            await request(app)
                .post('/recipes')
                .then(res => {
                    expect(res.statusCode).toEqual(404);
                    // TODO - Check no changes to collection
                });
        });

        test('PUT fails and returns 404', async () => {
            await request(app)
                .put('/recipes')
                .then(res => {
                    expect(res.statusCode).toEqual(404);
                    // TODO - Check no changes to collection
                });
        });

        test('DELETE fails and returns 404', async () => {
            await request(app)
                .delete('/recipes')
                .then(res => {
                    expect(res.statusCode).toEqual(404);
                    // TODO - Check no changes to collection
                });
        });
    });
});
