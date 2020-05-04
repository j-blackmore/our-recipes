import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import Timelapse from '@material-ui/icons/Timelapse';

const useStyles = makeStyles({
    icon: {
        paddingRight: 5
    },
    container: {
        display: 'flex',
        marginBottom: '0.5em',
        justifyContent: 'space-between'
    },
    timeContainer: {
        display: 'flex'
    },
    textContainer: {
        margin: 'auto 0'
    }
});

const RecipeTimings = ({ prepTime, cookTime }) => {
    const classes = useStyles();

    const getPluralTime = time => {
        const base = ' min';
        return time + (time === 1 ? base : base + 's');
    };

    return (
        <div className={classes.container}>
            <div className={classes.timeContainer}>
                <Timelapse className={classes.icon} />
                <div className={classes.textContainer}>
                    <Typography display="inline" variant="body1">
                        Prep: {getPluralTime(prepTime)}
                    </Typography>
                </div>
            </div>
            <div className={classes.timeContainer}>
                <Timelapse className={classes.icon} />
                <div className={classes.textContainer}>
                    <Typography display="inline" variant="body1">
                        Cook: {getPluralTime(cookTime)}
                    </Typography>
                </div>
            </div>
        </div>
    );
};

export default RecipeTimings;
