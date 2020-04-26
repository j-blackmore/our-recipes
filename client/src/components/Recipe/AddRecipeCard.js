import React, { useState } from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import RecipeCardContainer from '../../containers/Recipe/RecipeCardContainer';
import RecipeCardAction from '../../containers/Recipe/RecipeCardAction';
import RecipeController from '../../controllers/RecipeController';

const useStyles = makeStyles({
    card: {
        textAlign: 'center',
        backgroundColor: 'rgb(230, 230, 230)'
    }
});

export default function AddRecipeCard(props) {
    const { addNewRecipe } = props;
    const classes = useStyles();

    const [open, setOpen] = useState(false);

    return (
        <>
            <RecipeCardContainer
                classes={[classes.card, props.classes].join(' ')}
                onClick={() => setOpen(true)}
            >
                <RecipeCardAction>
                    <Typography variant="h2">+</Typography>
                </RecipeCardAction>
            </RecipeCardContainer>
            <RecipeController
                addNewRecipe={addNewRecipe}
                open={open}
                handleOpen={() => setOpen(true)}
                handleClose={() => setOpen(false)}
            />
        </>
    );
}
