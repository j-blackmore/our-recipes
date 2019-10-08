import React from 'react';
import { Button } from '@material-ui/core';

export default function AddRecipeButton(props) {
    return (
        <Button variant="contained" color="primary" onClick={props.onFormSubmit}>
            Save
        </Button>
    );
}
