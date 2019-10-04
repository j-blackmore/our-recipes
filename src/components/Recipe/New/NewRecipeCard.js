import React from 'react';
import { IconButton, makeStyles } from '@material-ui/core';
import Clear from '@material-ui/icons/Clear'
import RecipeCardContainer from '../../../containers/Recipe/RecipeCardContainer';
import RecipeHeader from '../RecipeHeader';
import AddRecipeForm from '../../Form/AddRecipe/AddRecipeForm';

const useStyles = makeStyles({
    card: {
        width: '90%',
        height: '80%',
        marginTop: 64,
        maxWidth: 500
    },
});

export default function NewRecipeCard(props) {
    const classes = useStyles();
    
    return (
        <RecipeCardContainer classes={classes.card} >
            <RecipeHeader 
                title="Create New Recipe" 
                subtitle="Fill in the field below, and submit."
                action={<IconButton onClick={props.handleClose}><Clear/></IconButton>}
            />
            <AddRecipeForm 
                newRecipe={props.newRecipe} 
                handleInputChange={props.handleInputChange} 
                saveRecipe={props.saveRecipe} 
                validateForm={props.validateForm}
                handleImageUpload={props.handleImageUpload}
                getUploadedImageName={props.getUploadedImageName}
            />
        </RecipeCardContainer>
    );
}
