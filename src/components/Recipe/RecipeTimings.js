import React from 'react';
import { Typography } from '@material-ui/core';
import AccessTime from '@material-ui/icons/AccessTime';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    icon: {
        paddingRight: 7,
    },
    container: {
        display: 'flex',
        marginBottom: '0.35em'
    },
    textContainer: {
        margin: 'auto 0'
    }
});

export default function RecipeTimings(props) {
    const classes = useStyles();

    const getPluralTime = (time) => {
        const base = " min";
        return time + (time === 1 ? base : base + "s");
    }

    return(
        <div className={classes.container}>
            <AccessTime className={classes.icon}/>
            <div className={classes.textContainer}>
                <Typography display="inline" variant="body1">
                    Prep: {getPluralTime(props.prepTime)} <b>|</b> Cook: {getPluralTime(props.cookTime)}
                </Typography>
            </div>
        </div>
    );
}
