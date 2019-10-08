import React from 'react';
import RecipeModal from '../RecipeModal';
import NewRecipeCard from './NewRecipeCard';

export default function NewRecipeModal(props) {
    return (
        <RecipeModal open={props.open} handleClose={props.handleClose}>
            <NewRecipeCard 
                handleClose={props.handleClose} 
                newRecipe={props.newRecipe}
                recipeErrors={props.recipeErrors}
                saveRecipe={props.saveRecipe} 
                handleInputChange={props.handleInputChange}
                validateForm={props.validateForm}
                handleImageUpload={props.handleImageUpload}
                getUploadedImageName={props.getUploadedImageName}
            />
        </RecipeModal>
    );
}
