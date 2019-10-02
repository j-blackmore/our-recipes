import React from 'react';
import { Card, CardActionArea } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    card: {
        height: 385
    },
    actionArea: {
        height: '100%'
    }
});

export default function RecipeCardContainer(props) {
    const classes = useStyles();
    let classNames = [classes.card, props.classes].join(" ")

    return (
        <Card className={classNames} onClick={props.handleOpen}>
            {props.children}
        </Card>
    );
}