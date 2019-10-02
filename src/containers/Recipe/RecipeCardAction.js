import React from 'react';
import { CardActionArea, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    actionArea: {
        height: '100%',
    },
});

export default function RecipeCardAction(props) {
    const classes = useStyles();

    return (
        <CardActionArea className={classes.actionArea}>
            {props.children}
        </CardActionArea>
    );
}
