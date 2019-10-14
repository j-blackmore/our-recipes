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
                title={props.newRecipe.title} 
                hasError={props.recipeErrors.title} 
                handleInputChange={props.handleInputChange}
            />
            <RecipeSubtitleInput 
                classes={classes.input} 
                subtitle={props.newRecipe.subtitle} 
                hasError={props.recipeErrors.subtitle} 
                handleInputChange={props.handleInputChange}
            />
            <RecipeTimeInput 
                classes={classes.input} 
                label="Prep Time (mins)"
                name="prepTime"
                value={props.newRecipe.prepTime} 
                hasError={props.recipeErrors.prepTime} 
                handleInputChange={props.handleInputChange}
            />
            <RecipeTimeInput 
                classes={classes.input} 
                label="Cooking Time (mins)"
                name="cookTime"
                value={props.newRecipe.cookTime} 
                hasError={props.recipeErrors.cookTime} 
                handleInputChange={props.handleInputChange}
            />
            <RecipeMethodInput 
                classes={classes.input} 
                method={props.newRecipe.method} 
                hasError={props.recipeErrors.method} 
                handleInputChange={props.handleInputChange}
            />
            <RecipeIngredientsInput 
                classes={classes.input} 
                ingredients={props.newRecipe.ingredients} 
                hasError={props.recipeErrors.ingredients} 
                handleInputChange={props.handleInputChange}
            />
            <AddImageButton 
                handleImageUpload={props.handleImageUpload} 
                getUploadedImageName={props.getUploadedImageName}
            />
        </FormControl>
    );
}
