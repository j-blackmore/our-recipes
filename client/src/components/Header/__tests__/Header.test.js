import React from 'react';
import { cleanup, render, screen } from 'test-utils';
import Header from '../Header';

afterEach(cleanup);

describe('Header tests', () => {
    test('Displays header correctly', () => {
        render(<Header />);
        expect(screen.getByText('Our Recipes')).toBeInTheDocument();
    });
});
