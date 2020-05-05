import React from 'react';
import { render, screen } from 'test-utils';
import RecipeImage from '../RecipeImage';

describe('RecipeImage', () => {
    test('renders correctly with no props provided', () => {
        render(<RecipeImage />);

        const image = screen.getByTitle(/No Image/);
        expect(image).toBeInTheDocument();
        expect(image).toBeInstanceOf(HTMLDivElement);
        expect(image.style).toHaveProperty('background-image');
        expect(image.style['background-image']).toMatch(/^url\(.+\)$/);
    });

    test('renders correct title when no url provided', () => {
        render(<RecipeImage title="Chocolate Cake" />);

        expect(screen.queryByTitle(/Chocolate Cake/)).toBeNull();

        const image = screen.getByTitle(/No Image/);
        expect(image).toBeInTheDocument();
        expect(image).toBeInstanceOf(HTMLDivElement);
        expect(image.style).toHaveProperty('background-image');
        expect(image.style['background-image']).toMatch(/^url\(.+\)$/);
    });

    test('renders default title when url provided but no title', () => {
        render(<RecipeImage url="chocolate-cake.jpg" />);

        expect(screen.queryByTitle(/No Image/)).toBeNull();

        const image = screen.getByTitle(/Image of Recipe/);
        expect(image).toBeInTheDocument();
        expect(image).toBeInstanceOf(HTMLDivElement);
        expect(image.style).toHaveProperty('background-image');
        expect(image.style['background-image']).toMatch(
            /url\(chocolate-cake.jpg\)$/
        );
    });

    test('renders correctly when title & url provided', () => {
        render(<RecipeImage url="chocolate-cake.jpg" title="Chocolate cake" />);

        expect(screen.queryByTitle(/No Image/)).toBeNull();
        expect(screen.queryByTitle(/Image of Recipe/)).toBeNull();

        const image = screen.getByTitle(/Chocolate cake/);
        expect(image).toBeInTheDocument();
        expect(image).toBeInstanceOf(HTMLDivElement);
        expect(image.style).toHaveProperty('background-image');
        expect(image.style['background-image']).toMatch(
            /url\(chocolate-cake.jpg\)$/
        );
    });

    test('renders correctly with large prop applied', () => {
        render(<RecipeImage large />);

        const image = screen.getByTitle(/No Image/);
        expect(image).toBeInTheDocument();
        expect(image).toBeInstanceOf(HTMLDivElement);
        expect(image.style).toHaveProperty('background-image');
        expect(image.style['background-image']).toMatch(/url\(.+\)$/);
    });
});
