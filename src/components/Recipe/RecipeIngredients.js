import React from 'react';
import { Typography } from '@material-ui/core';
import RecipeIngredient from './RecipeIngredient';

export default function RecipeIngredients(props) {
    return (
        <React.Fragment>
            <Typography gutterBottom variant="h6">
                Ingredients
            </Typography>
            {props.ingredients.map((ingredient, i) => {
                return <RecipeIngredient key={i} ingredient={ingredient}/>
            })}
        </React.Fragment>
    );
}