import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import RecipeCardContainer from '../Wrappers/RecipeCardContainer';
import RecipeCardAction from '../Wrappers/RecipeCardAction';

const useStyles = makeStyles({
    card: {
        textAlign: 'center',
        backgroundColor: 'rgb(230, 230, 230)'
    }
});

const AddRecipeCard = ({ onClick }) => {
    const classes = useStyles();

    return (
        <RecipeCardContainer classes={classes.card} onClick={onClick}>
            <RecipeCardAction>
                <Typography variant="h2">+</Typography>
            </RecipeCardAction>
        </RecipeCardContainer>
    );
};

export default AddRecipeCard;
