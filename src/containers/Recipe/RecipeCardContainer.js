import React from 'react';
import { Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    card: {
    }
});

export default function RecipeCardContainer(props) {
    const classes = useStyles();

    return (
        <Card className={props.classes} onClick={props.handleOpen}>
            {props.children}
        </Card>
    );
}