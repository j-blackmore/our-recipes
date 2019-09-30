import React from 'react';
import { Card, CardActionArea, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Clear from '@material-ui/icons/Clear';
import RecipeHeader from './RecipeHeader';
import RecipeImage from './RecipeImage';
import RecipeContent from './RecipeContent';

const useStyles = makeStyles({
    card: {
    },
});

export default function RecipeCardDetailed(props) {
    const classes = useStyles();
    const recipe = props.recipe;

    return (
        <Card className={classes.card} className={props.classes} onClick={props.handleOpen}>
            <CardActionArea>
                <RecipeHeader title={recipe.title} subtitle={recipe.subtitle} action={<IconButton onClick={props.handleClose}><Clear/></IconButton>}/>
                <RecipeImage imageUrl={recipe.imageUrl}/>
                <RecipeContent recipe={recipe}/>
            </CardActionArea>
        </Card>
    );
}
