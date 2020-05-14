const request = require('supertest');
const app = require('../../app');
const mongoDB = require('../mongoDB');

const { initEmptyDatabase } = require('../../test/utils');

beforeAll(async () => {
    await mongoDB.connect((verbose = false));
    await initEmptyDatabase();
});

afterAll(async () => {
    await mongoDB.disconnect((verbose = false));
});

describe.skip('recipesController', () => {
    test('GET /recipes returns empty array when no recipes exist', async () => {
        await request(app)
            .get('/recipes')
            .then(res => {
                // TODO: Test for no recipes but sucessful request
                expect(res.statusCode).toEqual(200);
                expect(res.body).toEqual([]);
                console.log(res.body);
            });
    });

    test('GET /recipes returns array of 1 element when 1 exists', async () => {
        await request(app)
            .get('/recipes')
            .then(res => {
                // TODO: Test for 1 recipes in an array & sucessful request
                expect(res.statusCode).toEqual(200);
            });
    });

    test('GET /recipes returns array of multiple element when they exist', async () => {
        await request(app)
            .get('/recipes')
            .then(res => {
                // TODO: Test for array of recipes & sucessful request
                expect(res.statusCode).toEqual(200);
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
