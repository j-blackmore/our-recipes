import React from 'react';
import { TextField } from '@material-ui/core';

export default function RecipeTitleInput(props) {

    return (
        <TextField
            className={props.classes}
            label="Title"
            name="title"
            fullWidth
            required
            value={props.title}
            onChange={props.handleInputChange}
        />
    );
}
