import React from 'react';
import RecipeModal from '../RecipeModal';
import NewRecipeCard from './NewRecipeCard';

export default function NewRecipeModal(props) {
    return (
        <RecipeModal open={props.open} handleClose={props.handleClose}>
            <NewRecipeCard 
                handleClose={props.handleClose} 
                saveRecipe={props.saveRecipe} 
            />
        </RecipeModal>
    );
}
