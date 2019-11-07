import React from 'react';
import RecipeCard from '../../components/Recipe/RecipeCard';
import RecipeDetailedModal from '../../components/Recipe/RecipeDetailedModal';
import RecipeController from '../../controllers/RecipeController';

export default function RecipeGridItemRecipe(props) {
    return (
        <React.Fragment>
            <RecipeCard recipe={props.recipe} onClick={props.handleViewOpen} />
            <RecipeDetailedModal 
                viewOpen={props.viewOpen} 
                handleViewClose={props.handleViewClose} 
                recipe={props.recipe} 
                handleDelete={props.handleDelete}
                editOpen={props.editOpen}
                handleEditOpen={props.handleEditOpen}
                handleEditClose={props.handleEditClose}
                handleEdit={props.handleEdit}
            />
            <RecipeController 
                mode="edit"
                recipe={props.recipe}
                editOpen={props.editOpen}
                handleClose={props.handleEditClose}
                handleOpen={props.handleEditOpen}
                updateRecipe={props.updateRecipe}
            />
        </React.Fragment>
    );
}
