import React from 'react';
import EditRecipeCard from './EditRecipeCard';
import RecipeModal from '../RecipeModal';

export default function EditRecipeModal(props) {
    return (
        <RecipeModal open={props.editOpen} handleClose={props.handleEditClose}>
            <EditRecipeCard 
                recipe={props.recipe}
                handleClose={props.handleEditClose}
                updateRecipe={props.updateRecipe}
            />
        </RecipeModal>
    );
}
