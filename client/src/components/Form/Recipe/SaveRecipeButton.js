import React from 'react';
import { Button } from '@material-ui/core';

const SaveRecipeButton = ({ onFormSubmit }) => {
    return (
        <Button variant="contained" color="primary" onClick={onFormSubmit}>
            Save
        </Button>
    );
};

export default SaveRecipeButton;
