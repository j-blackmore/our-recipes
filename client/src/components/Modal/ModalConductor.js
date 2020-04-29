import React, { useState, useContext } from 'react';
import RecipeModal from '../Recipe/RecipeModal';
import RecipeCardDetailed from '../Recipe/RecipeCardDetailed';
import EditRecipeCard from '../Recipe/EditRecipeCard';
import ViewContext from '../../contexts/ViewContext';

const ModalConductor = props => {
    const { state, dispatch } = useContext(ViewContext);

    const deleteRecipe = () => {
        const { _id } = state.recipe;
        const postRequestOpts = {
            method: 'POST'
        };

        fetch('/recipes/delete/' + _id, postRequestOpts).then(
            res => {
                handleClose();
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
                handleClose(newRecipe);
            },
            err => console.error(err)
        );
    };

    const handleClose = (newRecipe = false) => {
        const { modalView, recipe } = state;

        if (modalView === 'edit') {
            dispatch({
                modalView: 'recipe',
                recipe: newRecipe ? newRecipe : recipe
            });
        } else {
            dispatch({ modalView: 'none' });
        }
    };

    const defaultView =
        state.modalView === 'none' || state.modalView === 'recipe';

    return (
        <RecipeModal
            open={state.modalView !== 'none'}
            handleClose={e => handleClose()}
        >
            <>
                {defaultView && (
                    <RecipeCardDetailed
                        recipe={state.recipe}
                        handleClose={e => handleClose()}
                        handleDelete={deleteRecipe}
                        handleEdit={() => dispatch({ modalView: 'edit' })}
                    />
                )}

                {state.modalView === 'edit' && (
                    <EditRecipeCard
                        recipe={state.recipe}
                        handleClose={e => handleClose()}
                        updateRecipe={updateRecipe}
                    />
                )}
            </>
        </RecipeModal>
    );
};

export default ModalConductor;
