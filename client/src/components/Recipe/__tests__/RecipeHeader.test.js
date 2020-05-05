import React from 'react';
import { render, screen, fireEvent } from 'test-utils';
import RecipeHeader from '../RecipeHeader';
import { IconButton } from '@material-ui/core';
import Clear from '@material-ui/icons/Clear';

describe('RecipeHeader', () => {
    test('renders correctly with only a title', () => {
        render(<RecipeHeader title="Recipe title" />);

        const title = screen.getByText(/Recipe title/);
        expect(title).toBeInTheDocument();

        const defaultSubtitle = screen.getByText(/-/);
        expect(defaultSubtitle).toBeInTheDocument();
    });

    test('renders correctly with title & subtitle', () => {
        render(<RecipeHeader title="Recipe title" subtitle="the subtitle" />);

        const title = screen.getByText(/Recipe title/);
        expect(title).toBeInTheDocument();

        const subtitle = screen.getByText(/the subtitle/);
        expect(subtitle).toBeInTheDocument();

        expect(screen.queryByText(/-/)).toBeNull();
    });

    test('renders correctly with title, subtitle & action', () => {
        const mockClick = jest.fn();
        render(
            <RecipeHeader
                title="Recipe title"
                subtitle="some subtitle"
                action={
                    <IconButton onClick={mockClick}>
                        <Clear title="close-icon" />
                    </IconButton>
                }
            />
        );

        const title = screen.getByText(/Recipe title/);
        expect(title).toBeInTheDocument();

        const subtitle = screen.getByText(/some subtitle/);
        expect(subtitle).toBeInTheDocument();

        expect(screen.queryByText(/-/)).toBeNull();

        const closeIcon = screen.getByTitle(/close-icon/);
        expect(closeIcon).toBeInTheDocument();
        fireEvent.click(closeIcon);
        expect(mockClick).toHaveBeenCalledTimes(1);
    });
});
