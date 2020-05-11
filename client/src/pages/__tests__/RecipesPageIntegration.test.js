import React from 'react';
import {
    render,
    screen,
    userEvent,
    waitForElementToBeRemoved,
    act
} from 'test-utils';
import RecipesPage from '../RecipesPage';
import recipesAPI from 'recipesAPI';

const mockRecipe = {
    title: 'The recipe title',
    subtitle: 'some subtitle',
    method: 'lorem ipsum',
    ingredients: ['thingy', 'another'],
    extras: [''],
    prepTime: 10,
    cookTime: 5,
    serves: 0,
    imageId: '',
    imageUrl: '',
    creator: 'Integration Tester'
};

jest.mock('recipesAPI');

afterEach(() => {
    jest.clearAllMocks();
});

const renderPage = async () => {
    await act(async () => {
        render(<RecipesPage />);
    });
};

// Integration tests
describe('When user is on the RecipespPage', () => {
    test('user can open & close add new recipe modal', async () => {
        recipesAPI.getRecipes.mockImplementation(() => Promise.resolve([]));
        await renderPage();

        const addRecipeCard = await screen.getByText(/\+/i);
        userEvent.click(addRecipeCard);

        const createTitle = /Create New Recipe/;
        const createSubtitle = /Enter your recipe below, add an image and save\./;

        expect(screen.getByText(createTitle)).toBeInTheDocument();
        expect(screen.getByText(createSubtitle)).toBeInTheDocument();

        const closeBtn = screen.getByLabelText(/close/);
        expect(closeBtn).toBeInTheDocument();
        userEvent.click(closeBtn);

        await waitForElementToBeRemoved(() => screen.queryByText(createTitle));
        expect(screen.queryByText(createTitle)).not.toBeInTheDocument();
        expect(screen.queryByText(createSubtitle)).not.toBeInTheDocument();

        expect(recipesAPI.getRecipes).toHaveBeenCalledTimes(1);
    });

    test('user can open & close detailed recipe view modal', async () => {
        recipesAPI.getRecipes.mockImplementation(() =>
            Promise.resolve([mockRecipe])
        );
        await renderPage();

        const recipeCard = await screen.getByText(/The recipe title/);
        userEvent.click(recipeCard);

        expect(screen.getByText(/lorem ipsum/)).toBeInTheDocument();
        expect(screen.getByText(/thingy/)).toBeInTheDocument();
        expect(screen.getByText(/another/)).toBeInTheDocument();

        const closeBtn = screen.getByLabelText(/close/);
        expect(closeBtn).toBeInTheDocument();
        userEvent.click(closeBtn);

        await waitForElementToBeRemoved(() => screen.getByLabelText(/close/));
        expect(screen.queryByLabelText(/close/)).not.toBeInTheDocument();
        expect(screen.queryByText(/lorem ipsum/)).not.toBeInTheDocument();
        expect(screen.queryByText(/thingy/)).not.toBeInTheDocument();
        expect(screen.queryByText(/another/)).not.toBeInTheDocument();

        expect(recipesAPI.getRecipes).toHaveBeenCalledTimes(1);
    });

    test('user can create a new recipe', async () => {
        recipesAPI.getRecipes.mockImplementation(() => Promise.resolve([]));
        await renderPage();

        const addRecipeCard = await screen.getByText(/\+/i);
        userEvent.click(addRecipeCard);

        const createTitle = /Create New Recipe/;
        const createSubtitle = /Enter your recipe below, add an image and save\./;
        expect(screen.getByText(createTitle)).toBeInTheDocument();
        expect(screen.getByText(createSubtitle)).toBeInTheDocument();

        const titleInput = screen.getByRole('textbox', { name: 'title' });
        userEvent.type(titleInput, mockRecipe.title);
        expect(titleInput).toHaveAttribute('value', mockRecipe.title);

        const subtitleInput = screen.getByRole('textbox', {
            name: 'subtitle'
        });
        userEvent.type(subtitleInput, mockRecipe.subtitle);
        expect(subtitleInput).toHaveAttribute('value', mockRecipe.subtitle);

        const prepTimeInput = screen.getByRole('textbox', {
            name: 'Preparation Time (mins)'
        });
        userEvent.type(prepTimeInput, mockRecipe.prepTime.toString());
        expect(prepTimeInput).toHaveAttribute(
            'value',
            mockRecipe.prepTime.toString()
        );

        const cookTimeInput = screen.getByRole('textbox', {
            name: 'Cooking Time (mins)'
        });
        userEvent.type(cookTimeInput, mockRecipe.cookTime.toString());
        expect(cookTimeInput).toHaveAttribute(
            'value',
            mockRecipe.cookTime.toString()
        );

        const servesInput = screen.getByRole('textbox', {
            name: 'serves'
        });
        userEvent.type(servesInput, mockRecipe.serves.toString());
        expect(servesInput).toHaveAttribute(
            'value',
            mockRecipe.serves.toString()
        );

        const ingredientsInput = screen.getByRole('textbox', {
            name: 'ingredients'
        });
        const stringedIngredients = mockRecipe.ingredients.join('\n');
        userEvent.type(ingredientsInput, stringedIngredients, {
            allAtOnce: true
        });
        expect(ingredientsInput.textContent).toBe(
            mockRecipe.ingredients.join('\n')
        );

        const methodInput = screen.getByRole('textbox', {
            name: 'method'
        });
        userEvent.type(methodInput, mockRecipe.method);
        expect(methodInput).toHaveTextContent(mockRecipe.method);

        const creatorInput = screen.getByRole('textbox', {
            name: 'Created By'
        });
        userEvent.type(creatorInput, mockRecipe.creator);
        expect(creatorInput).toHaveAttribute('value', mockRecipe.creator);

        recipesAPI.getRecipes.mockImplementation(() =>
            Promise.resolve([mockRecipe])
        );
        recipesAPI.addRecipe.mockImplementation(async () =>
            Promise.resolve({ status: 'ok' })
        );

        const saveBtn = screen.getByRole('button', { name: 'Save' });
        expect(saveBtn).toBeInTheDocument();
        userEvent.click(saveBtn);
        await waitForElementToBeRemoved(() => screen.getByText(createTitle));
        expect(recipesAPI.addRecipe).toHaveBeenCalledTimes(1);
        expect(recipesAPI.getRecipes).toHaveBeenCalledTimes(2);
        expect(saveBtn).not.toBeInTheDocument();
        expect(screen.getByText(mockRecipe.title)).toBeInTheDocument();
        expect(addRecipeCard).toBeInTheDocument();
    });

    test('user can delete a recipe', async () => {
        recipesAPI.getRecipes.mockImplementation(() =>
            Promise.resolve([mockRecipe])
        );
        await renderPage();

        const recipeCard = await screen.getByText(/The recipe title/);
        userEvent.click(recipeCard);
        expect(screen.getByText(/lorem ipsum/)).toBeInTheDocument();

        recipesAPI.deleteRecipe.mockImplementation(() =>
            Promise.resolve({ status: 'ok' })
        );
        recipesAPI.getRecipes.mockImplementation(() => Promise.resolve([]));

        const deleteBtn = screen.getByRole('button', { name: 'delete' });
        userEvent.click(deleteBtn);

        await waitForElementToBeRemoved(() =>
            screen.getByRole('button', { name: 'delete' })
        );
        expect(recipesAPI.deleteRecipe).toHaveBeenCalledTimes(1);
        expect(recipesAPI.getRecipes).toHaveBeenCalledTimes(2);
        expect(screen.queryByText(/The recipe title/)).not.toBeInTheDocument();
        expect(screen.queryByText(/lorem ipsum/)).not.toBeInTheDocument();
        expect(screen.getByText(/\+/)).toBeInTheDocument();
    });

    test('user can edit a recipe', async () => {
        recipesAPI.getRecipes.mockImplementation(() =>
            Promise.resolve([mockRecipe])
        );
        await renderPage();

        const recipeCard = await screen.getByText(/The recipe title/);
        userEvent.click(recipeCard);

        const editBtn = screen.getByLabelText(/edit/);
        expect(editBtn).toBeInTheDocument();
        userEvent.click(editBtn);
        expect(editBtn).not.toBeInTheDocument();

        const titleInput = screen.getByRole('textbox', { name: 'title' });
        expect(titleInput).toHaveAttribute('value', mockRecipe.title);
        userEvent.clear(titleInput);
        userEvent.type(titleInput, 'New Recipe Title');
        expect(titleInput).toHaveAttribute('value', 'New Recipe Title');

        const methodInput = screen.getByRole('textbox', {
            name: 'method'
        });
        expect(methodInput).toHaveTextContent(mockRecipe.method);
        userEvent.clear(methodInput);
        userEvent.type(methodInput, 'new instructions');
        expect(methodInput).toHaveTextContent('new instructions');

        recipesAPI.getRecipes.mockImplementation(() =>
            Promise.resolve([
                {
                    ...mockRecipe,
                    title: 'New Recipe Title',
                    method: 'new instructions'
                }
            ])
        );
        recipesAPI.updateRecipe.mockImplementation(() =>
            Promise.resolve({ status: 'ok' })
        );

        const saveBtn = screen.getByRole('button', { name: 'Save' });
        await act(async () => userEvent.click(saveBtn));
        expect(saveBtn).not.toBeInTheDocument();
        expect(screen.getByLabelText(/edit/)).toBeInTheDocument();
        expect(screen.queryByText(mockRecipe.title)).not.toBeInTheDocument();
        expect(screen.getAllByText('New Recipe Title')).toHaveLength(2);
        expect(screen.getByText('new instructions')).toBeInTheDocument();

        const closeBtn = screen.getByLabelText(/close/);
        userEvent.click(closeBtn);
        await waitForElementToBeRemoved(() => screen.getByLabelText(/close/));
        expect(screen.queryByText('new instructions')).not.toBeInTheDocument();
        expect(closeBtn).not.toBeInTheDocument();
        expect(screen.getAllByText('New Recipe Title')).toHaveLength(1);
    });
});
