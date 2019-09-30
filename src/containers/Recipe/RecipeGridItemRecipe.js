import React from 'react';
import RecipeCard from '../../components/Recipe/RecipeCard';
import RecipeModal from '../../components/Recipe/RecipeModal';

export default function RecipeGridItemRecipe(props) {
    return (
        <React.Fragment>
            <RecipeCard recipe={props.recipe} handleOpen={props.handleOpen} />
            <RecipeModal open={props.open} handleClose={props.handleClose} recipe={props.recipe} />
        </React.Fragment>
    );
}
