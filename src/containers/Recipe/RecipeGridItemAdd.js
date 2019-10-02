import React from 'react';
import AddRecipeCard from '../../components/Recipe/AddRecipeCard';
import CreateRecipeController from '../../controllers/CreateRecipeController';

export default function RecipeGridItemAdd(props) {
    return (
        <React.Fragment>
            <AddRecipeCard classes={props.classes} handleOpen={props.handleOpen} />
            <CreateRecipeController 
                addNewRecipe={props.addNewRecipe} 
                open={props.open} 
                handleOpen={props.handleOpen} 
                handleClose={props.handleClose} 
            />
        </React.Fragment>
    );
}
