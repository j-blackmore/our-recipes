import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    ingredient: {
        display: 'flex',
    }
});

export default function RecipeIngredient(props) {
    const classes = useStyles();

    return (
        <Typography 
            className={classes.ingredient}
            variant="body2"
            component="span"
        >
            {props.ingredient}
        </Typography>
    );
}
