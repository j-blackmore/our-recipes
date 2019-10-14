import React from 'react';
import { CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import RecipeIngredients from './RecipeIngredients';
import RecipeMethod from './RecipeMethod';
import RecipeTimings from './RecipeTimings';

const useStyles = makeStyles({
    content: {
        height: 140,
        overflow: 'scroll',
    }
});

export default function RecipeContent(props) {
    const classes = useStyles();
    const recipe = props.recipe;

    const detailContent =
        <React.Fragment>
            <RecipeIngredients ingredients={recipe.ingredients}/>
            <RecipeMethod method={recipe.method}/>
        </React.Fragment>;

    return (
        <CardContent className={classes.content}>
            <RecipeTimings recipe={props.recipe} />
            {props.detailed ? detailContent : null}
        </CardContent>
    );
}
