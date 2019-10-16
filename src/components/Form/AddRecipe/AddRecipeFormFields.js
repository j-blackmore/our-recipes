import React from 'react';
import { FormControl, makeStyles } from '@material-ui/core';
import RecipeTitleInput from './RecipeTitleInput';
import RecipeSubtitleInput from './RecipeSubtitleInput';
import RecipeMethodInput from './RecipeMethodInput';
import RecipeIngredientsInput from './RecipeIngredientsInput';
import RecipeTimeInput from './RecipeTimeInput';
import AddImageButton from './AddImageButton';

const useStyles = makeStyles({
    input: {
        marginTop: 5,
        marginBottom: 5
    },
});

export default function AddRecipeFormFields(props) {
    const classes = useStyles();

    return (
        <FormControl fullWidth>
            <RecipeTitleInput 
                classes={classes.input} 
                title={props.recipe.title} 
                hasError={props.errors.title} 
                handleInputChange={props.handleInputChange}
            />
            <RecipeSubtitleInput 
                classes={classes.input} 
                subtitle={props.recipe.subtitle} 
                hasError={props.errors.subtitle} 
                handleInputChange={props.handleInputChange}
            />
            <RecipeTimeInput 
                classes={classes.input} 
                label="Prep Time (mins)"
                name="prepTime"
                value={props.recipe.prepTime} 
                hasError={props.errors.prepTime} 
                handleInputChange={props.handleInputChange}
            />
            <RecipeTimeInput 
                classes={classes.input} 
                label="Cooking Time (mins)"
                name="cookTime"
                value={props.recipe.cookTime} 
                hasError={props.errors.cookTime} 
                handleInputChange={props.handleInputChange}
            />
            <RecipeMethodInput 
                classes={classes.input} 
                method={props.recipe.method} 
                hasError={props.errors.method} 
                handleInputChange={props.handleInputChange}
            />
            <RecipeIngredientsInput 
                classes={classes.input} 
                ingredients={props.recipe.ingredients} 
                hasError={props.errors.ingredients} 
                handleInputChange={props.handleInputChange}
            />
            <AddImageButton 
                handleImageUpload={props.handleImageUpload} 
                uploadedImageName={props.uploadedImageName}
            />
        </FormControl>
    );
}
