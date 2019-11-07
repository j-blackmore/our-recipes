import React from 'react';
import AddRecipeCard from '../../components/Recipe/AddRecipeCard';
import RecipeController from '../../controllers/RecipeController';

export default function RecipeGridItemAdd(props) {
    return (
        <React.Fragment>
            <AddRecipeCard classes={props.classes} handleViewOpen={props.handleViewOpen} />
            <RecipeController 
                addNewRecipe={props.addNewRecipe}
                open={props.viewOpen}
                handleOpen={props.handleViewOpen} 
                handleClose={props.handleViewClose}
            />
        </React.Fragment>
    );
}
