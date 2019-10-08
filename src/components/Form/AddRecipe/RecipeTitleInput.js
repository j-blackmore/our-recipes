import React from 'react';
import { TextField } from '@material-ui/core';

export default function RecipeTitleInput(props) {

    return (
        <TextField
            className={props.classes}
            label="Title"
            name="title"
            helperText={props.hasError ? "Required" : ""}
            fullWidth
            required
            value={props.title}
            error={props.hasError}
            onChange={props.handleInputChange}
            onBlur={props.handleInputBlur}
        />
    );
}
