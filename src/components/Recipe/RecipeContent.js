import React from 'react';
import { CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import RecipeIngredients from './RecipeIngredients';
import RecipeMethod from './RecipeMethod';

const useStyles = makeStyles({
    content: {
        height: 140,
        overflow: 'scroll',
    }
});

export default function RecipeContent(props) {
    const classes = useStyles();
    const recipe = props.recipe;

    return (
        <CardContent className={classes.content}>
            <RecipeIngredients ingredients={recipe.ingredients}/>
            <RecipeMethod method={recipe.method}/>
        </CardContent>
    );
}
