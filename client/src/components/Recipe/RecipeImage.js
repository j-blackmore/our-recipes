import React from 'react';
import { CardMedia } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    media: {
        height: 140
    }
});

const defaultUrl = '/images/no-image.svg';

const RecipeImage = ({ url = defaultUrl, title = 'No Image' }) => {
    const classes = useStyles();

    return (
        <CardMedia
            className={classes.media}
            image={url || defaultUrl}
            title={title}
        />
    );
};

export default RecipeImage;
