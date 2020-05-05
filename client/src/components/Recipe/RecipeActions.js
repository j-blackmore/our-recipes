import React from 'react';
import { CardActions, IconButton } from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';

export default function RecipeActions({ deleteClick, editClick }) {
    return (
        <CardActions disableSpacing>
            <IconButton aria-label="delete" onClick={deleteClick}>
                <Delete title="delete-icon" />
            </IconButton>
            <IconButton aria-label="edit" onClick={editClick}>
                <Edit title="edit-icon" />
            </IconButton>
        </CardActions>
    );
}
