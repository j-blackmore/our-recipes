import React from 'react';
import { render, screen } from 'test-utils';
import RecipeContent from '../RecipeContent';

const mockRecipe = {
    ingredients: ['ingredient one', 'ingredient two'],
    method: 'The recipe method',
    prepTime: 10,
    cookTime: 60
};

describe('RecipeContent', () => {
    test('renders normal view correctly with no method or ingredients', () => {
        render(<RecipeContent recipe={mockRecipe} />);

        const prepTime = screen.getByText(/Prep: 10 mins/);
        expect(prepTime).toBeInTheDocument();

        const cookTime = screen.getByText(/Cook: 60 mins/);
        expect(cookTime).toBeInTheDocument();

        expect(screen.queryByText(/The recipe method/)).toBeNull();
        expect(screen.queryByText(/ingredient one/)).toBeNull();
        expect(screen.queryByText(/ingredient two/)).toBeNull();
    });

    test('renders detailed view correctly with method & ingredients', () => {
        render(<RecipeContent detailed recipe={mockRecipe} />);

        const prepTime = screen.getByText(/Prep: 10 mins/);
        expect(prepTime).toBeInTheDocument();

        const cookTime = screen.getByText(/Cook: 60 mins/);
        expect(cookTime).toBeInTheDocument();

        const methodTitle = screen.getByText(/Method/);
        expect(methodTitle).toBeInTheDocument();
        const method = screen.getByText(/The recipe method/);
        expect(method).toBeInTheDocument();

        const ingredientsTitle = screen.getByText(/Ingredients/);
        expect(ingredientsTitle).toBeInTheDocument();
        const ingredient1 = screen.getByText(/ingredient one/);
        expect(ingredient1).toBeInTheDocument();
        const ingredient2 = screen.getByText(/ingredient two/);
        expect(ingredient2).toBeInTheDocument();
    });
});
