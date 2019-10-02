import React from 'react';
import { TextField } from '@material-ui/core';

export default function RecipeIngredientsInput(props) {
    return (
        <TextField
            className={props.classes}
            label="Ingredients"
            name="ingredients"
            fullWidth
            required
            multiline
            rows="6"
            value={props.ingredients}
            onChange={props.handleInputChange}
        />
    );
}
