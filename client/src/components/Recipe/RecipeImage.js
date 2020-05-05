import React from 'react';
import { CardMedia } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    media: {
        height: 180,
        margin: '-16px 16px 16px',
        borderRadius: '4px',
        boxShadow:
            '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)'
    },
    mediaLarge: {
        height: 240
    }
});

const defaultUrl = '/images/no-image.svg';
const defaultTitle = 'Image of Recipe';
const noImageTitle = 'No Image';

const RecipeImage = ({ url = '', title = defaultTitle, large = false }) => {
    const classes = useStyles();

    return (
        <CardMedia
            className={`${classes.media} ${large ? classes.mediaLarge : ''}`}
            image={url || defaultUrl}
            title={url ? title : noImageTitle}
        />
    );
};

export default RecipeImage;
