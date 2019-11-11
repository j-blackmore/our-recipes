import React from 'react';
import { CardActions, IconButton } from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';

export default function RecipeActions(props) {
    return (
        <CardActions disableSpacing>
            <IconButton aria-label="delete" onClick={props.handleDelete}>
                <Delete />
            </IconButton>
            <IconButton aria-label="delete" onClick={props.handleEdit}>
                <Edit />
            </IconButton>
        </CardActions>
    );
}
