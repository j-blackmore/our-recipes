const mongoose = require('mongoose');
const mongoDB = require('../../controllers/mongoDB');
const Recipe = require('../recipe.model');

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

describe('Recipe Model', () => {
    test('create & save recipe successfully', async () => {
        const newRecipe = new Recipe(recipeData);
        const savedRecipe = await newRecipe.save();

        expect(savedRecipe._id).toBeDefined();
        expect(savedRecipe.createdAt).toBeDefined();
        expect(savedRecipe.title).toBe(recipeData.title);
        expect(savedRecipe.subtitle).toBe(recipeData.subtitle);
        savedRecipe.ingredients.forEach((ingredient, index) =>
            expect(ingredient).toBe(recipeData.ingredients[index])
        );
        expect(savedRecipe.method).toBe(recipeData.method);
        savedRecipe.extras.forEach((extra, index) =>
            expect(extra).toBe(recipeData.extras[index])
        );
        expect(savedRecipe.imageUrl).toBe(recipeData.imageUrl);
        expect(savedRecipe.imageId).toBe(recipeData.imageId);
        expect(savedRecipe.prepTime).toBe(recipeData.prepTime);
        expect(savedRecipe.cookTime).toBe(recipeData.cookTime);
        expect(savedRecipe.serves).toBe(recipeData.serves);
        expect(savedRecipe.creator).toBe(recipeData.creator);
    });

    test('undefined fields in the schema are not saved when saving recipe', async () => {
        const testData = {
            ...recipeData,
            origin: 'Europe',
            password: 'password123'
        };
        const newRecipe = new Recipe(testData);
        const savedRecipe = await newRecipe.save();

        expect(savedRecipe.origin).toBeUndefined();
        expect(savedRecipe.password).toBeUndefined();
        expect(savedRecipe.id).toBeDefined();
        expect(savedRecipe.createdAt).toBeDefined();
        expect(savedRecipe.title).toBe(recipeData.title);
        expect(savedRecipe.subtitle).toBe(recipeData.subtitle);
        savedRecipe.ingredients.forEach((ingredient, index) =>
            expect(ingredient).toBe(recipeData.ingredients[index])
        );
        expect(savedRecipe.method).toBe(recipeData.method);
        savedRecipe.extras.forEach((extra, index) =>
            expect(extra).toBe(recipeData.extras[index])
        );
        expect(savedRecipe.imageUrl).toBe(recipeData.imageUrl);
        expect(savedRecipe.imageId).toBe(recipeData.imageId);
        expect(savedRecipe.prepTime).toBe(recipeData.prepTime);
        expect(savedRecipe.cookTime).toBe(recipeData.cookTime);
        expect(savedRecipe.serves).toBe(recipeData.serves);
        expect(savedRecipe.creator).toBe(recipeData.creator);
    });

    test('errors when adding recipe without required fields', async () => {
        const testData = {
            subtitle: 'a test recipe subtitle description',
            creator: 'Jest testing'
        };
        const newRecipe = new Recipe(testData);

        let error;
        try {
            error = await newRecipe.save();
        } catch (e) {
            error = e;
        }

        expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(error.errors.title).toBeDefined();
        expect(error.errors.method).toBeDefined();
        expect(error.errors.prepTime).toBeDefined();
        expect(error.errors.cookTime).toBeDefined();
        expect(error.errors.serves).toBeDefined();
    });
});
