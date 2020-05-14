import React from 'react';
import { render, screen, act } from 'test-utils';
import RecipesGrid from '../RecipesGrid';
import recipesAPI from '../../../recipesAPI';

afterEach(() => {
    jest.clearAllMocks();
});

jest.mock('recipesAPI');

const mockRecipe = {
    _id: 'abcdef1234567890abcdef1234567890',
    title: 'Recipe Title',
    subtitle: 'Recipe subtitle',
    method: 'Recipe method',
    ingredients: ['ingredient one', 'ingredient two'],
    cookTime: 15,
    prepTime: 5,
    imageId: '',
    imageUrl: ''
};

const mockRecipes = [
    mockRecipe,
    {
        _id: '1234567890abcdef1234567890abcdef',
        title: 'Another title',
        subtitle: 'Another subtitle',
        method: 'Another method',
        ingredients: ['some ingredient', 'another one'],
        cookTime: 32,
        prepTime: 17,
        imageId: '',
        imageUrl: ''
    }
];

const renderGrid = async () => {
    await act(async () => {
        render(<RecipesGrid />);
    });
};

describe('RecipesGrid', () => {
    test('fetches recipes only once during render', async () => {
        recipesAPI.getRecipes.mockImplementation(() =>
            Promise.resolve({ recipes: [] })
        );
        await renderGrid();
        expect(recipesAPI.getRecipes).toHaveBeenCalledTimes(1);
    });

    test('renders correctly with no recipes', async () => {
        recipesAPI.getRecipes.mockImplementation(() =>
            Promise.resolve({ recipes: [] })
        );
        await renderGrid();

        const addCard = screen.getByText(/\+/i);
        expect(addCard).toBeInTheDocument();
    });

    test('renders correctly with 1 recipe', async () => {
        recipesAPI.getRecipes.mockImplementation(() =>
            Promise.resolve({ recipes: [mockRecipe] })
        );
        await renderGrid();
        const recipeTitle = screen.getByText(/Recipe Title/);
        expect(recipeTitle).toBeInTheDocument();

        const recipeSubtitle = screen.getByText(/Recipe subtitle/);
        expect(recipeSubtitle).toBeInTheDocument();

        const recipePrepTime = screen.getByText(/Prep: 5/);
        expect(recipePrepTime).toBeInTheDocument();

        const recipeCookTime = screen.getByText(/Cook: 15/);
        expect(recipeCookTime).toBeInTheDocument();

        const addCard = screen.getByText(/\+/i);
        expect(addCard).toBeInTheDocument();
    });

    test('renders correctly with multiple recipes', async () => {
        recipesAPI.getRecipes.mockImplementation(() =>
            Promise.resolve({ recipes: mockRecipes })
        );
        await renderGrid();

        const recipe1Title = screen.getByText(/Recipe Title/);
        expect(recipe1Title).toBeInTheDocument();

        const recipe1Subtitle = screen.getByText(/Recipe subtitle/);
        expect(recipe1Subtitle).toBeInTheDocument();

        const recipe1PrepTime = screen.getByText(/Prep: 5/);
        expect(recipe1PrepTime).toBeInTheDocument();

        const recipe1CookTime = screen.getByText(/Cook: 15/);
        expect(recipe1CookTime).toBeInTheDocument();

        const recipe2Title = screen.getByText(/Another title/);
        expect(recipe2Title).toBeInTheDocument();

        const recipe2Subtitle = screen.getByText(/Another subtitle/);
        expect(recipe2Subtitle).toBeInTheDocument();

        const recipe2PrepTime = screen.getByText(/Prep: 17/);
        expect(recipe2PrepTime).toBeInTheDocument();

        const recipe2CookTime = screen.getByText(/Cook: 32/);
        expect(recipe2CookTime).toBeInTheDocument();

        const addCard = screen.getByText(/\+/i);
        expect(addCard).toBeInTheDocument();
    });
});
