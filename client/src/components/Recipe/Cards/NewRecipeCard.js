import React from 'react';
import { IconButton, makeStyles } from '@material-ui/core';
import Clear from '@material-ui/icons/Clear';
import CardWrapper from '../../Wrappers/CardWrapper';
import RecipeHeader from '../RecipeHeader';
import RecipeForm from '../../Form/RecipeForm';

const useStyles = makeStyles({
    card: {
        width: '90%',
        maxWidth: 500,
        height: 'auto',
        maxHeight: '90%',
        overflow: 'scroll'
    },
    header: {
        padding: '16px 16px 8px'
    },
    content: {
        height: '60%',
        overflow: 'scroll'
    }
});

const NewRecipeCard = ({ handleClose, saveRecipe }) => {
    const classes = useStyles();

    return (
        <CardWrapper className={classes.card}>
            <RecipeHeader
                classes={classes.header}
                title="Create New Recipe"
                subtitle="Enter your recipe below, add an image and save."
                action={
                    <IconButton aria-label="close" onClick={handleClose}>
                        <Clear title="close-icon" />
                    </IconButton>
                }
            />
            <RecipeForm classes={classes.content} onSubmit={saveRecipe} />
        </CardWrapper>
    );
};
export default NewRecipeCard;
