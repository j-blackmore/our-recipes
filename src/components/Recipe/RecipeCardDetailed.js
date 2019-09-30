import React from 'react';
import { IconButton } from '@material-ui/core';
import Clear from '@material-ui/icons/Clear';
import RecipeCardContainer from '../../containers/Recipe/RecipeCardContainer';
import RecipeHeader from './RecipeHeader';
import RecipeImage from './RecipeImage';
import RecipeContent from './RecipeContent';

export default function RecipeCardDetailed(props) {
    const recipe = props.recipe;

    return (
        <RecipeCardContainer classes={props.classes} handleOpen={props.handleOpen}>
            <RecipeHeader title={recipe.title} subtitle={recipe.subtitle} action={<IconButton onClick={props.handleClose}><Clear/></IconButton>}/>
            <RecipeImage imageUrl={recipe.imageUrl}/>
            <RecipeContent recipe={recipe}/>
        </RecipeCardContainer>
    );
}
