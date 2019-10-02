import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import RecipeCardContainer from '../../containers/Recipe/RecipeCardContainer';
import RecipeCardAction from '../../containers/Recipe/RecipeCardAction';

const useStyles = makeStyles({
    card: {
        textAlign: 'center',
        backgroundColor: 'rgb(230, 230, 230)'
    },
});

export default function AddRecipeCard(props) {
    const classes = useStyles();
    let classNames= [classes.card, props.classes].join(" ");

    return(
        <RecipeCardContainer classes={classNames} handleOpen={props.handleOpen}>
            <RecipeCardAction>
                <Typography variant="h2">
                    +
                </Typography>
            </RecipeCardAction>
        </RecipeCardContainer>
    );
}