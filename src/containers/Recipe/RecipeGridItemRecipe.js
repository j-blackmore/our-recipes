import React from 'react';
import RecipeCard from '../../components/Recipe/RecipeCard';
import RecipeDetailedModal from '../../components/Recipe/RecipeDetailedModal';

export default function RecipeGridItemRecipe(props) {
    return (
        <React.Fragment>
            <RecipeCard recipe={props.recipe} onClick={props.handleViewOpen} />
            <RecipeDetailedModal viewOpen={props.viewOpen} handleViewClose={props.handleViewClose} recipe={props.recipe} handleDelete={props.handleDelete} />
        </React.Fragment>
    );
}
