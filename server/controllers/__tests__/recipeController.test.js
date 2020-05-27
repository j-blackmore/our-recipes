const request = require('supertest');
const app = require('../../app');
const mongoDB = require('../mongoDB');
const Recipe = require('../../models/recipe.model');

const { initEmptyDb, cleanupDb, recipeData } = require('../../test/utils');

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

describe('recipeController', () => {
    describe('/recipe', () => {
        test('POST successfully adds recipe', async () => {
            const recipes = await Recipe.find().exec();
            expect(recipes).toEqual([]);

            await request(app)
                .post('/recipe')
                .send({ recipe: recipeData })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .then(async res => {
                    expect(res.statusCode).toEqual(200);
                    expect(res.body.status).toEqual(
                        'Recipe added successfully'
                    );

                    const recipes = await Recipe.find().exec();
                    expect(recipes.length).toEqual(1);
                    expect(recipes[0]._id).toBeDefined();
                    expect(recipes[0].title).toEqual(recipeData.title);
                });
        });
    });

    describe('/recipe/:id', () => {
        test('PUT successfully updates a recipe', async () => {
            const recipe = await Recipe(recipeData).save();

            const ID = recipe._id;
            const updateData = {
                ...recipeData,
                title: 'Updated recipe title',
                serves: 99
            };

            // TODO: exec() on queries returns a Promise, potentially extract this logic
            const recipes = await Recipe.find().exec();
            expect(recipes.length).toEqual(1);
            expect(recipes[0]._id).toBeDefined();
            expect(recipes[0].title).toEqual(recipeData.title);
            expect(recipes[0].serves).toEqual(recipeData.serves);

            await request(app)
                .put(`/recipe/${ID}`)
                .send(updateData)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .then(async res => {
                    expect(res.statusCode).toEqual(200);
                    expect(res.body.status).toEqual(
                        'Recipe updated successfully'
                    );

                    const recipes = await Recipe.find().exec();
                    expect(recipes.length).toEqual(1);
                    expect(recipes[0]._id).toBeDefined();
                    expect(recipes[0].title).toEqual('Updated recipe title');
                    expect(recipes[0].serves).toEqual(99);
                });
        });

        test('DELETE sucessfully deletes a recipe', async () => {
            const savedRecipe = await Recipe(recipeData).save();
            const ID = savedRecipe._id;

            const recipes = await Recipe.find().exec();
            expect(recipes.length).toEqual(1);
            expect(recipes[0]._id).toBeDefined();
            expect(recipes[0].title).toEqual(recipeData.title);

            await request(app)
                .delete(`/recipe/${ID}`)
                .expect('Content-Type', /json/)
                .then(async res => {
                    expect(res.statusCode).toEqual(200);
                    expect(res.body.status).toEqual(
                        'Recipe deleted successfully'
                    );

                    const recipes = await Recipe.find().exec();
                    expect(recipes).toEqual([]);
                });
        });
    });
});
