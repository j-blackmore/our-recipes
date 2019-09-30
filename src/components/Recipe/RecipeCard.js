import React from 'react';
import { CardActionArea } from '@material-ui/core';
import RecipeCardContainer from '../../containers/Recipe/RecipeCardContainer';
import RecipeHeader from './RecipeHeader';
import RecipeImage from './RecipeImage';
import RecipeContent from './RecipeContent';

export default function RecipeCard(props) {
    const recipe = props.recipe;

    return (
        <RecipeCardContainer classes={props.classes} handleOpen={props.handleOpen}>
            <CardActionArea>
                <RecipeHeader title={recipe.title} subtitle={recipe.subtitle}/>
                <RecipeImage imageUrl={recipe.imageUrl}/>
                <RecipeContent recipe={recipe}/>
            </CardActionArea>
        </RecipeCardContainer>
    );
}
