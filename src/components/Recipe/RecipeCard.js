import React from 'react';
import { makeStyles } from '@material-ui/styles';
import RecipeCardContainer from '../../containers/Recipe/RecipeCardContainer';
import RecipeHeader from './RecipeHeader';
import RecipeImage from './RecipeImage';
import RecipeContent from './RecipeContent';
import RecipeCardAction from '../../containers/Recipe/RecipeCardAction';

const useStyles = makeStyles({
    card: {
    },
});

export default function RecipeCard(props) {
    const classes = useStyles();
    let classNames = [classes.card, props.classes].join(" ");
    const recipe = props.recipe;

    return (
        <RecipeCardContainer classes={classNames} handleOpen={props.handleOpen}>
            <RecipeCardAction>
                <RecipeHeader title={recipe.title} subtitle={recipe.subtitle}/>
                <RecipeImage imageUrl={recipe.imageUrl}/>
                <RecipeContent recipe={recipe}/>
            </RecipeCardAction>
        </RecipeCardContainer>
    );
}
