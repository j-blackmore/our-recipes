import React from 'react';
import { TextField } from '@material-ui/core';

export default function RecipeMethodInput(props) {
    return (
        <TextField
            className={props.classes}
            label="Method"
            name="method"
            helperText={props.hasError ? "Required" : ""}
            fullWidth
            required
            multiline
            rows="3"
            value={props.method}
            error={props.hasError}
            onChange={props.handleInputChange}
        />
    );
}
