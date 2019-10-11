import React from 'react';
import { FormControl, makeStyles } from '@material-ui/core';
import RecipeTitleInput from './RecipeTitleInput';
import RecipeSubtitleInput from './RecipeSubtitleInput';
import RecipeMethodInput from './RecipeMethodInput';
import RecipeIngredientsInput from './RecipeIngredientsInput';
import RecipePrepTimeInput from './RecipePrepTimeInput';
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
                handleInputBlur={props.handleInputBlur}
            />
            <RecipeSubtitleInput 
                classes={classes.input} 
                subtitle={props.newRecipe.subtitle} 
                hasError={props.recipeErrors.subtitle} 
                handleInputChange={props.handleInputChange}
                handleInputBlur={props.handleInputBlur}
            />
            <RecipePrepTimeInput 
                classes={classes.input} 
                subtitle={props.newRecipe.prepTime} 
                hasError={props.recipeErrors.prepTime} 
                handleInputChange={props.handleInputChange}
                handleInputBlur={props.handleInputBlur}
            />
            <RecipeMethodInput 
                classes={classes.input} 
                method={props.newRecipe.method} 
                hasError={props.recipeErrors.method} 
                handleInputChange={props.handleInputChange}
                handleInputBlur={props.handleInputBlur}
            />
            <RecipeIngredientsInput 
                classes={classes.input} 
                ingredients={props.newRecipe.ingredients} 
                hasError={props.recipeErrors.ingredients} 
                handleInputChange={props.handleInputChange}
                handleInputBlur={props.handleInputBlur}
            />
            <AddImageButton 
                handleImageUpload={props.handleImageUpload} 
                getUploadedImageName={props.getUploadedImageName}
            />
        </FormControl>
    );
}
