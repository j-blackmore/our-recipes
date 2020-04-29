import React, { useContext } from 'react';
import axios from 'axios';
import ModalWrapper from './ModalWrapper';
import RecipeCardDetailed from '../Recipe/RecipeCardDetailed';
import EditRecipeCard from '../Recipe/EditRecipeCard';
import ViewContext from '../../contexts/ViewContext';
import NewRecipeCard from '../Recipe/NewRecipeCard';

const ModalConductor = () => {
    const {
        state: { modalView, prevView, recipe },
        dispatch
    } = useContext(ViewContext);

    const deleteRecipe = () => {
        const { _id } = recipe;
        const postRequestOpts = {
            method: 'POST'
        };

        fetch('/recipes/delete/' + _id, postRequestOpts).then(
            res => {
                handleClose(true);
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
                handleClose(true, newRecipe);
            },
            err => console.error(err)
        );
    };

    const addRecipe = async (newRecipe, newImage = null) => {
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
                handleClose(true);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const handleClose = (updateRecipes = false, newRecipe = false) => {
        if (modalView === 'edit') {
            dispatch({
                updateRecipes: updateRecipes,
                modalView: 'recipe',
                prevView: 'edit',
                recipe: newRecipe ? newRecipe : recipe
            });
        } else {
            dispatch({
                prevView: modalView,
                modalView: '',
                updateRecipes: updateRecipes
            });
        }
    };

    const recipeView =
        modalView === 'recipe' || (modalView === '' && prevView === 'recipe');

    const editView = modalView === 'edit';

    const addView =
        modalView === 'add' || (modalView === '' && prevView === 'add');

    return (
        <ModalWrapper open={!!modalView} handleClose={() => handleClose()}>
            <>
                {recipeView && (
                    <RecipeCardDetailed
                        recipe={recipe}
                        handleClose={() => handleClose()}
                        deleteRecipe={deleteRecipe}
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
        </ModalWrapper>
    );
};

export default ModalConductor;
