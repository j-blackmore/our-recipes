import React from 'react';
import { TextField } from '@material-ui/core';

export default function RecipePrepTimeInput(props) {

    return (
        <TextField
            className={props.classes}
            label="Prep Time"
            name="prepTime"
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
