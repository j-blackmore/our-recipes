import React, { useContext } from 'react';
import { IconButton, makeStyles } from '@material-ui/core';
import Clear from '@material-ui/icons/Clear';
import ViewContext from '../../../contexts/ViewContext';
import CardWrapper from '../../Wrappers/CardWrapper';
import RecipeHeader from '../RecipeHeader';
import RecipeImage from '../RecipeImage';
import RecipeContent from '../RecipeContent';
import RecipeActions from '../RecipeActions';

const useStyles = makeStyles({
    card: {
        width: '100%',
        maxWidth: 385,
        margin: 16
    }
});

const RecipeCardDetailed = ({ recipe, handleClose, deleteRecipe }) => {
    const { dispatch } = useContext(ViewContext);
    const classes = useStyles();

    const showEditView = () =>
        dispatch({ prevView: 'recipe', modalView: 'edit' });

    return (
        <CardWrapper className={classes.card}>
            <RecipeImage large url={recipe.imageUrl} title={recipe.title} />
            <RecipeHeader
                title={recipe.title}
                subtitle={recipe.subtitle}
                action={
                    <IconButton aria-label="close" onClick={handleClose}>
                        <Clear title="close-icon" />
                    </IconButton>
                }
            />
            <RecipeContent detailed recipe={recipe} />
            <RecipeActions
                deleteClick={deleteRecipe}
                editClick={showEditView}
            />
        </CardWrapper>
    );
};

export default RecipeCardDetailed;
