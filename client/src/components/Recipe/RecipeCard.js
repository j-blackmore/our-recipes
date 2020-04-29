import React, { useContext } from 'react';
import ViewContext from '../../contexts/ViewContext';
import RecipeCardContainer from '../Wrappers/RecipeCardContainer';
import RecipeHeader from './RecipeHeader';
import RecipeImage from './RecipeImage';
import RecipeContent from './RecipeContent';
import RecipeCardAction from '../Wrappers/RecipeCardAction';

const RecipeCard = ({ recipe }) => {
    const { dispatch } = useContext(ViewContext);

    const showDetailedModal = () =>
        dispatch({ modalView: 'recipe', prevView: '', recipe: recipe });

    return (
        <RecipeCardContainer onClick={() => showDetailedModal()}>
            <RecipeCardAction>
                <RecipeHeader title={recipe.title} subtitle={recipe.subtitle} />
                <RecipeImage imageUrl={recipe.imageUrl} />
                <RecipeContent recipe={recipe} />
            </RecipeCardAction>
        </RecipeCardContainer>
    );
};

export default RecipeCard;
