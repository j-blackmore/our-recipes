import React from 'react';
import { render, screen } from 'test-utils';
import RecipeIngredients from '../RecipeIngredients';

const mockIngredients = ['one ingredient', 'another', 'ingredient three'];

describe('RecipeIngredients', () => {
    test('renders correctly with no ingredients', () => {
        render(<RecipeIngredients />);

        const ingredientsTitle = screen.getByText(/Ingredients/);
        expect(ingredientsTitle).toBeInTheDocument();
    });

    test('renders correctly with one ingredient', () => {
        render(<RecipeIngredients ingredients={['one thing']} />);

        const ingredientsTitle = screen.getByText(/Ingredients/);
        expect(ingredientsTitle).toBeInTheDocument();

        const ingredient1 = screen.getByText(/one thing/);
        expect(ingredient1).toBeInTheDocument();
    });

    test('renders correctly with multiple ingredients', () => {
        render(<RecipeIngredients ingredients={mockIngredients} />);

        const ingredientsTitle = screen.getByText(/Ingredients/);
        expect(ingredientsTitle).toBeInTheDocument();

        const ingredient1 = screen.getByText(/one ingredient/);
        expect(ingredient1).toBeInTheDocument();
        const ingredient2 = screen.getByText(/another/);
        expect(ingredient2).toBeInTheDocument();
        const ingredient3 = screen.getByText(/ingredient three/);
        expect(ingredient3).toBeInTheDocument();
    });
});
