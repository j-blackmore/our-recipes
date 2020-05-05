import React from 'react';
import { render, screen } from 'test-utils';
import RecipeTimings from '../RecipeTimings';

describe('RecipeTimings', () => {
    test('renders correctly with plural and signular times', () => {
        render(<RecipeTimings prepTime={10} cookTime={1} />);

        const prepTimeText = screen.getByText(/Prep: 10 mins/);
        expect(prepTimeText).toBeInTheDocument();
        expect(screen.getByTitle(/prep-time-clock/)).toBeInTheDocument();

        const cookTimeText = screen.getByText(/Cook: 1 min/);
        expect(cookTimeText).toBeInTheDocument();
        expect(screen.getByTitle(/cook-time-clock/)).toBeInTheDocument();
    });
});
