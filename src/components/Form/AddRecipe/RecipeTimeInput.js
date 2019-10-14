import React from 'react';
import { TextField } from '@material-ui/core';

export default function RecipeTimeInput(props) {

    return (
        <TextField
            className={props.classes}
            label={props.label}
            name={props.name}
            helperText={props.hasError ? "Required" : ""}
            fullWidth
            required
            value={props.prepTime}
            error={props.hasError}
            onChange={props.handleInputChange}
            onBlur={props.handleInputBlur}
        />
    );
}
