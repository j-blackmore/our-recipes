import React from 'react';
import { IconButton, makeStyles } from '@material-ui/core';
import Clear from '@material-ui/icons/Clear'
import RecipeCardContainer from '../../../containers/Recipe/RecipeCardContainer';
import RecipeHeader from '../RecipeHeader';
import RecipeForm from '../../Form/Recipe/RecipeForm';

const useStyles = makeStyles({
    card: {
        width: '90%',
        height: 'auto',
        maxWidth: 500
    },
    header: {
        padding: '16px 16px 8px',
    },
    content: {
        height: '60%',
        overflow: 'scroll'
    }
});

export default function NewRecipeCard(props) {
    const classes = useStyles();
    
    return (
        <RecipeCardContainer classes={classes.card} >
            <RecipeHeader 
                classes={classes.header}
                title="Create New Recipe" 
                subtitle="Enter your recipe below, add an image and save."
                action={<IconButton onClick={props.handleClose}><Clear/></IconButton>}
            />
            <RecipeForm 
                classes={classes.content}
                onSubmit={props.saveRecipe} 
            />
        </RecipeCardContainer>
    );
}
