const request = require('supertest');
const app = require('../../app');
const mongoDB = require('../mongoDB');
const Recipe = require('../../models/recipe.model');

const { initEmptyDb, exampleRecipes, cleanupDb } = require('../../test/utils');

beforeAll(async () => {
    await mongoDB.connect((verbose = false));
});

beforeEach(async () => {
    await initEmptyDb();
});

afterAll(async () => {
    await cleanupDb();
    await mongoDB.disconnect((verbose = false));
});

const initRecipe = async recipe => await Recipe(recipe).save();

const initRecipes = async recipes => {
    await recipes.forEach(recipe => initRecipe(recipe));
};

describe('recipesController', () => {
    test('GET /recipes returns empty array when no recipes exist', async () => {
        await request(app)
            .get('/recipes')
            .then(res => {
                // TODO: Test for no recipes but sucessful request
                expect(res.statusCode).toEqual(200);
                expect(res.body).toEqual({ recipes: [] });
            });
    });

    test('GET /recipes returns array of 1 element when 1 exists', async () => {
        await initRecipe(exampleRecipes[0]);
        await request(app)
            .get('/recipes')
            .then(res => {
                expect(res.statusCode).toEqual(200);
                expect(res.body).toEqual({ recipes: [exampleRecipes[0]] });
            });
    });

    test('GET /recipes returns array of multiple element when they exist', async () => {
        await initRecipes(exampleRecipes);
        await request(app)
            .get('/recipes')
            .then(res => {
                expect(res.statusCode).toEqual(200);
                expect(res.body).toEqual({ recipes: exampleRecipes });
            });
    });

    test('POST /recipes fails and returns 404', async () => {
        await request(app)
            .post('/recipes')
            .then(res => {
                expect(res.statusCode).toEqual(404);
            });
    });

    test('PUT /recipes fails and returns 404', async () => {
        await request(app)
            .put('/recipes')
            .then(res => {
                expect(res.statusCode).toEqual(404);
            });
    });

    test('DELETE /recipes fails and returns 404', async () => {
        await request(app)
            .delete('/recipes')
            .then(res => {
                expect(res.statusCode).toEqual(404);
            });
    });
});
