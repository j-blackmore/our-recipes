import React from 'react';
import RecipeCard from '../../components/Recipe/RecipeCard';
import RecipeDetailedModal from '../../components/Recipe/RecipeDetailedModal';

export default function RecipeGridItemRecipe(props) {
    return (
        <React.Fragment>
            <RecipeCard recipe={props.recipe} handleOpen={props.handleOpen} />
            <RecipeDetailedModal open={props.open} handleClose={props.handleClose} recipe={props.recipe} handleDelete={props.handleDelete} />
        </React.Fragment>
    );
}
