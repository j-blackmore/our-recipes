import React from 'react';
import { TextField } from '@material-ui/core';

export default function RecipeSubtitleInput(props) {

    return (
        <TextField
            className={props.classes}
            label="Subtitle"
            name="subtitle"
            fullWidth
            value={props.subtitle}
            onChange={props.handleInputChange}
        />
    );
}
