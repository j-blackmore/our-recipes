import React from 'react';
import { CardMedia } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    media: {
        height: 140,
    }
});

export default function RecipeImage(props) {
    const classes = useStyles();

    return (
        <CardMedia 
            className={classes.media}
            image={props.imageUrl}
            title={props.imageUrl}
        />
    );
}
