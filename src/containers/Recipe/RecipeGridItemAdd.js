import React from 'react';
import AddRecipeCard from '../../components/Recipe/AddRecipeCard';

export default function RecipeGridItemAdd(props) {

    return (
        <React.Fragment>
            <AddRecipeCard classes={props.classes} handleOpen={props.handleOpen}/>
        </React.Fragment>
    );
}