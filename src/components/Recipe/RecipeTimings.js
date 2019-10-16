import React from 'react';
import { Typography } from '@material-ui/core';
import Timelapse from '@material-ui/icons/Timelapse';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    icon: {
        paddingRight: 5,
    },
    container: {
        display: 'flex',
        marginBottom: '0.35em',
        justifyContent: 'space-between'
    },
    timeContainer: {
        display: 'flex',
    },
    textContainer: {
        margin: 'auto 0',
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
            <div className={classes.timeContainer}>
                <Timelapse className={classes.icon}/>
                <div className={classes.textContainer}>
                    <Typography display="inline" variant="body1">
                        Prep: {getPluralTime(props.prepTime)}
                    </Typography>
                </div>
            </div>
            <div className={classes.timeContainer}>
                <Timelapse className={classes.icon}/>
                <div className={classes.textContainer}>
                    <Typography display="inline" variant="body1">
                        Cook: {getPluralTime(props.cookTime)}
                    </Typography>
                </div>
            </div>
        </div>
    );
}
