import React from 'react';
import { cleanup, render, screen } from 'test-utils';
import Header from '../Header';

afterEach(cleanup);

describe('Header Component', () => {
    test('renders correctly', () => {
        render(<Header />);
        expect(screen.getByText('Our Recipes')).toBeInTheDocument();
    });
});
