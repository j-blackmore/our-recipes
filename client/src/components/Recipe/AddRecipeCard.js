import React, { useState } from 'react';
import axios from 'axios';
import { Typography, makeStyles } from '@material-ui/core';
import RecipeCardContainer from '../../containers/Recipe/RecipeCardContainer';
import RecipeCardAction from '../../containers/Recipe/RecipeCardAction';
import NewRecipeCard from './New/NewRecipeCard';
import RecipeModal from './RecipeModal';

const useStyles = makeStyles({
    card: {
        textAlign: 'center',
        backgroundColor: 'rgb(230, 230, 230)'
    }
});

const AddRecipeCard = ({ updateRecipes, classes }) => {
    const classNames = useStyles();
    const [open, setOpen] = useState(false);

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
                updateRecipes();
                setOpen(false);
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <>
            <RecipeCardContainer
                classes={[classNames.card, classes].join(' ')}
                onClick={() => setOpen(true)}
            >
                <RecipeCardAction>
                    <Typography variant="h2">+</Typography>
                </RecipeCardAction>
            </RecipeCardContainer>
            <RecipeModal open={open} handleClose={() => setOpen(false)}>
                <NewRecipeCard
                    handleClose={() => setOpen(false)}
                    saveRecipe={addRecipe}
                />
            </RecipeModal>
        </>
    );
};

export default AddRecipeCard;
