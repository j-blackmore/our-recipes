import React from 'react';
import { render, screen } from 'test-utils';
import RecipeCard from '../RecipeCard';

const mockRecipe = {
    _id: '1234567890abcdef',
    title: 'Test Recipe Title',
    subtitle: 'Test recipe subtitle',
    method: '',
    ingredients: [],
    prepTime: 7,
    cookTime: 77,
    imageId: '',
    imageUrl: ''
};

const renderRecipe = () => render(<RecipeCard recipe={mockRecipe} />);

describe('RecipeCard', () => {
    test('renders correctly with default image', () => {
        renderRecipe();

        const recipeImage = screen.getByTitle(/No Image/);
        expect(recipeImage).toBeInTheDocument();
        expect(recipeImage).toBeInstanceOf(HTMLDivElement);
        expect(recipeImage.style).toHaveProperty('background-image');
        expect(recipeImage.style['background-image']).toMatch(/^url\(.+\)$/);

        const recipeTitle = screen.getByText(/Test Recipe Title/);
        expect(recipeTitle).toBeInTheDocument();

        const recipeSubtitle = screen.getByText(/Test recipe subtitle/);
        expect(recipeSubtitle).toBeInTheDocument();

        const recipePrepTime = screen.getByText(/Prep: 7/);
        expect(recipePrepTime).toBeInTheDocument();

        const recipeCookTime = screen.getByText(/Cook: 77/);
        expect(recipeCookTime).toBeInTheDocument();
    });
});
