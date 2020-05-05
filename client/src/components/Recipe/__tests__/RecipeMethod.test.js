import React from 'react';
import { render, screen } from 'test-utils';
import RecipeMethod from '../RecipeMethod';

const mockMethod = 'This is the recipe method';

describe('RecipeMethod', () => {
    test('renders correctly with no method provided', () => {
        render(<RecipeMethod />);

        const methodTitle = screen.getByText(/Method/);
        expect(methodTitle).toBeInTheDocument();
    });

    test('renders correctly', () => {
        render(<RecipeMethod method={mockMethod} />);

        const methodTitle = screen.getByText(/Method/);
        expect(methodTitle).toBeInTheDocument();
        const method = screen.getByText(/This is the recipe method/);
        expect(method).toBeInTheDocument();
    });
});
