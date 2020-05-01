import React, { useContext } from 'react';
import recipesAPI from '../../recipesAPI';
import ModalWrapper from './ModalWrapper';
import RecipeCardDetailed from '../Recipe/Cards/RecipeCardDetailed';
import EditRecipeCard from '../Recipe/Cards/EditRecipeCard';
import ViewContext from '../../contexts/ViewContext';
import NewRecipeCard from '../Recipe/Cards/NewRecipeCard';

const ModalConductor = () => {
    const {
        state: { modalView, prevView, recipe },
        dispatch
    } = useContext(ViewContext);

    const deleteRecipe = () => {
        recipesAPI.deleteRecipe(recipe._id).then(
            res => handleClose(true),
            err => console.error(err)
        );
    };

    const updateRecipe = newRecipe => {
        const { _id, ingredients } = newRecipe;
        newRecipe.ingredients = ingredients.split(/\r?\n/);

        recipesAPI.updateRecipe(_id, newRecipe).then(
            res => handleClose(true, newRecipe),
            err => console.error(err)
        );
    };

    const addRecipe = async (newRecipe, newImage = null) => {
        const { ingredients } = newRecipe;
        newRecipe.ingredients = ingredients.split(/\r?\n/);

        if (newImage !== null) {
            await recipesAPI.uploadImage(newImage).then(
                ({ data: { imageUrl, imageId } = {} }) => {
                    newRecipe.imageUrl = imageUrl;
                    newRecipe.imageId = imageId;
                },
                err => console.error(err)
            );
        }

        await recipesAPI.addRecipe(newRecipe).then(
            res => handleClose(true),
            err => console.log(err)
        );
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
