import React from 'react';
import { TextField } from '@material-ui/core';

export default function RecipeTimeInput(props) {

    return (
        <TextField
            className={props.classes}
            label={props.label}
            name={props.name}
            helperText={props.hasError ? (props.value.length === 0 ? "Required" : "This must be a positive whole number") : ""}
            fullWidth
            required
            value={props.value}
            error={props.hasError}
            onChange={props.handleInputChange}
        />
    );
}
