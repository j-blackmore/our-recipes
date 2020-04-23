import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { toBeInTheDocument } from '@testing-library/jest-dom';
import Header from '../Header';

afterEach(cleanup);

describe('Header tests', () => {
    test('Displays header correctly', () => {
        render(<Header />);
        expect(screen.getByText('Our Recipes')).toBeInTheDocument();
    });
});
