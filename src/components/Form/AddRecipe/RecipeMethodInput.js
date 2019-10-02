import React from 'react';
import { TextField } from '@material-ui/core';

export default function RecipeMethodInput(props) {
    return (
        <TextField
            className={props.classes}
            label="Method"
            name="method"
            fullWidth
            required
            multiline
            rows="3"
            value={props.method}
            onChange={props.handleInputChange}
        />
    );
}
