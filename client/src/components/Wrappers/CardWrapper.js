import React from 'react';
import { Card, CardActionArea, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    card: {
        height: 'inherit',
        overflow: 'unset',
        margin: '16px 0'
    },
    action: {
        height: '100%'
    }
});

const CardWrapper = ({ children, onClick, className = '', action = false }) => {
    const classes = useStyles();
    let classNames = [classes.card, className].join(' ');

    return (
        <Card raised className={classNames} onClick={onClick}>
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
