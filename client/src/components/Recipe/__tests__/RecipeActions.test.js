import React from 'react';
import { render, screen, fireEvent } from 'test-utils';
import RecipeActions from '../RecipeActions';

describe('RecipeActions', () => {
    test('renders correctly', () => {
        render(<RecipeActions />);

        const deleteBtn = screen.getByLabelText(/delete/);
        expect(deleteBtn).toBeInTheDocument();
        expect(deleteBtn).toBeInstanceOf(HTMLButtonElement);
        const deleteIcon = screen.getByTitle(/delete-icon/);
        expect(deleteIcon).toBeInTheDocument();
        expect(deleteIcon).toBeInstanceOf(SVGSVGElement);

        const editBtn = screen.getByLabelText(/edit/);
        expect(editBtn).toBeInTheDocument();
        expect(editBtn).toBeInstanceOf(HTMLButtonElement);
        const editIcon = screen.getByTitle(/edit-icon/);
        expect(editIcon).toBeInTheDocument();
        expect(editIcon).toBeInstanceOf(SVGSVGElement);
    });

    test('calls onclick listener props correctly', () => {
        const mockDelete = jest.fn();
        const mockEdit = jest.fn();

        render(<RecipeActions deleteClick={mockDelete} editClick={mockEdit} />);

        const deleteBtn = screen.getByLabelText(/delete/);
        expect(deleteBtn).toBeInTheDocument();
        expect(deleteBtn).toBeInstanceOf(HTMLButtonElement);
        fireEvent.click(deleteBtn);
        expect(mockDelete).toHaveBeenCalledTimes(1);

        const editBtn = screen.getByLabelText(/edit/);
        expect(editBtn).toBeInTheDocument();
        expect(editBtn).toBeInstanceOf(HTMLButtonElement);
        fireEvent.click(editBtn);
        expect(mockEdit).toHaveBeenCalledTimes(1);
    });
});
