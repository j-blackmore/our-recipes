import React, { useContext } from 'react';
import axios from 'axios';
import RecipeModal from '../Recipe/RecipeModal';
import RecipeCardDetailed from '../Recipe/RecipeCardDetailed';
import EditRecipeCard from '../Recipe/EditRecipeCard';
import ViewContext from '../../contexts/ViewContext';
import NewRecipeCard from '../Recipe/NewRecipeCard';

const ModalConductor = () => {
    const { state, dispatch } = useContext(ViewContext);
    const { modalView, prevView, recipe } = state;

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

    const addRecipe = async (newRecipe, newImage) => {
        const { ingredients } = newRecipe;
        newRecipe.ingredients = ingredients.split(/\r?\n/);

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        if (newImage !== null) {
            await axios
                .post('/recipes/uploadImage', newImage, config)
                .then(response => {
                    newRecipe.imageUrl = response.data.imageUrl;
                    newRecipe.imageId = response.data.imageId;
                })
                .catch(error => {
                    console.log(error);
                });
        }

        await axios
            .post('/recipes/add', newRecipe)
            .then(response => {
                newRecipe._id = response.data.objectID;
                handleClose();
            })
            .catch(error => {
                console.log(error);
            });
    };

    const handleClose = (newRecipe = false) => {
        if (modalView === 'edit') {
            dispatch({
                modalView: 'recipe',
                prevView: 'edit',
                recipe: newRecipe ? newRecipe : recipe
            });
        } else {
            dispatch({ prevView: modalView, modalView: 'none' });
        }
    };

    const recipeView =
        modalView === 'recipe' ||
        (modalView === 'none' && prevView === 'recipe');

    const editView = modalView === 'edit';

    const addView =
        modalView === 'add' || (modalView === 'none' && prevView === 'add');

    const modalOpen = modalView !== 'none';

    return (
        <RecipeModal open={modalOpen} handleClose={() => handleClose()}>
            <>
                {recipeView && (
                    <RecipeCardDetailed
                        recipe={recipe}
                        handleClose={() => handleClose()}
                        handleDelete={deleteRecipe}
                    />
                )}

                {editView && (
                    <EditRecipeCard
                        recipe={recipe}
                        handleClose={() => handleClose()}
                        updateRecipe={updateRecipe}
                    />
                )}

                {addView && (
                    <NewRecipeCard
                        handleClose={() => handleClose()}
                        saveRecipe={addRecipe}
                    />
                )}
            </>
        </RecipeModal>
    );
};

export default ModalConductor;
