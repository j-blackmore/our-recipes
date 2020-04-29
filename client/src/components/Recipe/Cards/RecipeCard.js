import React, { useContext } from 'react';
import ViewContext from '../../../contexts/ViewContext';
import CardWrapper from '../../Wrappers/CardWrapper';
import RecipeHeader from '../RecipeHeader';
import RecipeImage from '../RecipeImage';
import RecipeContent from '../RecipeContent';

const RecipeCard = ({ recipe, recipe: { title, subtitle, imageUrl } }) => {
    const { dispatch } = useContext(ViewContext);

    const showDetailedModal = () =>
        dispatch({ modalView: 'recipe', prevView: '', recipe: recipe });

    return (
        <CardWrapper action onClick={() => showDetailedModal()}>
            <RecipeHeader title={title} subtitle={subtitle} />
            <RecipeImage url={imageUrl} title={title} />
            <RecipeContent recipe={recipe} />
        </CardWrapper>
    );
};

export default RecipeCard;
