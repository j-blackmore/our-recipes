import React from 'react';
import { Button } from '@material-ui/core';

export default function SaveRecipeButton(props) {
    return (
        <Button variant="contained" color="primary" onClick={props.onFormSubmit}>
            Save
        </Button>
    );
}
