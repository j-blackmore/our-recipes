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
        height: 443,
        width: 345
    }
});

const RecipeCardDetailed = ({ recipe, handleClose, deleteRecipe }) => {
    const { dispatch } = useContext(ViewContext);
    const classes = useStyles();

    const showEditView = () =>
        dispatch({ prevView: 'recipe', modalView: 'edit' });

    return (
        <CardWrapper className={classes.card}>
            <RecipeHeader
                title={recipe.title}
                subtitle={recipe.subtitle}
                action={
                    <IconButton onClick={handleClose}>
                        <Clear />
                    </IconButton>
                }
            />
            <RecipeImage url={recipe.imageUrl} title={recipe.title} />
            <RecipeContent detailed recipe={recipe} />
            <RecipeActions
                deleteClick={deleteRecipe}
                editClick={showEditView}
            />
        </CardWrapper>
    );
};

export default RecipeCardDetailed;
