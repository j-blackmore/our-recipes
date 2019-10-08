import React from 'react';
import { TextField } from '@material-ui/core';

export default function RecipeSubtitleInput(props) {

    return (
        <TextField
            className={props.classes}
            label="Subtitle"
            name="subtitle"
            helperText={props.hasError ? "Required" : ""}
            fullWidth
            required
            value={props.subtitle}
            error={props.hasError}
            onChange={props.handleInputChange}
            onBlur={props.handleInputBlur}
        />
    );
}
