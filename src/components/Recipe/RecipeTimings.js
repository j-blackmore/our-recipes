import React from 'react';
import { Typography } from '@material-ui/core';
import AccessTime from '@material-ui/icons/AccessTime';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    icon: {
        paddingRight: 5,
    },
    container: {
        display: 'flex'
    },
    textContainer: {
        margin: 'auto 0'
    }
});

export default function RecipeTimings(props) {
    const classes = useStyles();
    const totalTime = props.recipe.prepTime + props.recipe.cookTime;

    return(
        <React.Fragment>
            <div className={classes.container}>
                <AccessTime className={classes.icon}/><div className={classes.textContainer}><Typography display="inline" variant="body1">{totalTime} mins</Typography></div>
            </div>
        </React.Fragment>
    );
}
