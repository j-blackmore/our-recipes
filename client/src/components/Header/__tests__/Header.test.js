import React from 'react';
import { render, screen } from 'test-utils';
import Header from '../Header';

describe('Header Component', () => {
    test('renders correctly', () => {
        render(<Header />);
        expect(screen.getByText('Our Recipes')).toBeInTheDocument();
    });
});
