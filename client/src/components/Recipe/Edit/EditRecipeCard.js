import React from 'react';
import { IconButton, makeStyles } from '@material-ui/core';
import Clear from '@material-ui/icons/Clear';
import RecipeCardContainer from '../../../containers/Recipe/RecipeCardContainer';
import RecipeHeader from '../RecipeHeader';
import RecipeForm from '../../Form/RecipeForm';

const useStyles = makeStyles({
    card: {
        width: '90%',
        height: 'auto',
        maxWidth: 500
    },
    header: {
        padding: '16px 16px 8px'
    },
    content: {
        height: '60%',
        overflow: 'scroll'
    }
});

export default function EditRecipeCard(props) {
    const classes = useStyles();

    return (
        <RecipeCardContainer classes={classes.card}>
            <RecipeHeader
                classes={classes.header}
                title="Edit Recipe"
                subtitle="Update contents and save"
                action={
                    <IconButton onClick={props.handleClose}>
                        <Clear />
                    </IconButton>
                }
            />
            <RecipeForm
                classes={classes.content}
                recipe={props.recipe}
                onSubmit={props.updateRecipe}
                noImage
            />
        </RecipeCardContainer>
    );
}
