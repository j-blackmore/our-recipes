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
    let imageUrl = props.imageUrl ? props.imageUrl : "/images/no-image.svg";

    return (
        <CardMedia 
            className={classes.media}
            image={imageUrl}
            title={props.imageUrl}
        />
    );
}
