import React, { useState } from 'react';
import RecipeModal from './RecipeModal';
import RecipeCardDetailed from './RecipeCardDetailed';
import EditRecipeCard from './Edit/EditRecipeCard';

const Recipe = ({ show, recipe, handleClose, handleUpdate }) => {
    const [mode, setMode] = useState('view');

    const deleteRecipe = () => {
        const { _id } = recipe;
        const postRequestOpts = {
            method: 'POST'
        };

        fetch('/recipes/delete/' + _id, postRequestOpts).then(
            res => {
                closeModal();
            },
            err => console.error(err)
        );
    };

    const updateRecipe = newRecipe => {
        const { _id, ingredients } = newRecipe;
        newRecipe.ingredients = ingredients.split(/\r?\n/);

        const config = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newRecipe)
        };

        fetch('/recipes/update/' + _id, config).then(
            res => {
                handleUpdate(newRecipe);
                closeModal();
            },
            err => console.error(err)
        );
    };

    const closeModal = () => {
        mode === 'edit' ? setMode('view') : handleClose();
    };

    return (
        <RecipeModal open={show} handleClose={closeModal}>
            <>
                {mode === 'view' && (
                    <RecipeCardDetailed
                        recipe={recipe}
                        handleClose={closeModal}
                        handleDelete={deleteRecipe}
                        handleEdit={() => setMode('edit')}
                    />
                )}

                {mode === 'edit' && (
                    <EditRecipeCard
                        recipe={recipe}
                        handleClose={() => setMode('view')}
                        updateRecipe={updateRecipe}
                    />
                )}
            </>
        </RecipeModal>
    );
};

export default Recipe;
