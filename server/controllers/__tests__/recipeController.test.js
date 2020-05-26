const request = require('supertest');
const app = require('../../app');
const mongoDB = require('../mongoDB');
const Recipe = require('../../models/recipe.model');

const { initEmptyDb, cleanupDb, recipeData } = require('../../test/utils');

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

describe('recipeController', () => {
    describe('/recipe', () => {
        test('POST successfully adds recipe', async () => {
            await Recipe.find((err, recipes) => {
                expect(recipes).toEqual([]);
            });

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

                    await Recipe.find((err, recipes) => {
                        expect(recipes.length).toEqual(1);
                        expect(recipes[0]._id).toBeDefined();
                        expect(recipes[0].title).toEqual(recipeData.title);
                    });
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

            // TODO: Check if find() method on model can return a promise - if not then custom?
            await Recipe.find((err, recipes) => {
                expect(recipes.length).toEqual(1);
                expect(recipes[0]._id).toBeDefined();
                expect(recipes[0].title).toEqual(recipeData.title);
                expect(recipes[0].serves).toEqual(recipeData.serves);
            });

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

                    await Recipe.find((err, recipes) => {
                        expect(recipes.length).toEqual(1);
                        const updatedRecipe = recipes[0];
                        expect(updatedRecipe._id).toBeDefined();
                        expect(updatedRecipe.title).toEqual(
                            'Updated recipe title'
                        );
                        expect(updatedRecipe.serves).toEqual(99);
                    });
                });
        });

        test('DELETE sucessfully deletes a recipe', async () => {
            const savedRecipe = await Recipe(recipeData).save();
            const ID = savedRecipe._id;

            await Recipe.find((err, recipes) => {
                expect(recipes.length).toEqual(1);
                expect(recipes[0]._id).toBeDefined();
                expect(recipes[0].title).toEqual(recipeData.title);
            });

            await request(app)
                .delete(`/recipe/${ID}`)
                .expect('Content-Type', /json/)
                .then(async res => {
                    expect(res.statusCode).toEqual(200);
                    expect(res.body.status).toEqual(
                        'Recipe deleted successfully'
                    );

                    await Recipe.find((err, recipes) => {
                        expect(recipes).toEqual([]);
                    });
                });
        });
    });
});
