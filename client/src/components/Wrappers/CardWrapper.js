import React from 'react';
import { Card, CardActionArea, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    card: {
        height: 385
    },
    action: {
        height: '100%'
    }
});

const CardWrapper = ({ children, onClick, className = '', action = false }) => {
    const classes = useStyles();
    let classNames = [classes.card, className].join(' ');

    return (
        <Card className={classNames} onClick={onClick}>
            {action && (
                <CardActionArea className={classes.action}>
                    {children}
                </CardActionArea>
            )}
            {!action && children}
        </Card>
    );
};

export default CardWrapper;
