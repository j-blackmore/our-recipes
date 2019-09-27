import React from 'react';
import { Card, CardActionArea } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import RecipeHeader from './RecipeHeader';
import RecipeImage from './RecipeImage';
import RecipeContent from './RecipeContent';

const useStyles = makeStyles({
    card: {
    },
});

export default function RecipeCard(props) {
    const classes = useStyles();
    const recipe = props.recipe;

    return (
        <Card className={classes.card} className={props.classes} onClick={props.handleOpen}>
            <CardActionArea>
                <RecipeHeader title={recipe.title} subtitle={recipe.subtitle}/>
                <RecipeImage imageUrl={recipe.imageUrl}/>
                <RecipeContent recipe={recipe}/>
            </CardActionArea>
        </Card>
    );
}
