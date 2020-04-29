import React, { useContext } from 'react';
import { IconButton, makeStyles } from '@material-ui/core';
import Clear from '@material-ui/icons/Clear';
import ViewContext from '../../contexts/ViewContext';
import RecipeCardContainer from '../Wrappers/RecipeCardContainer';
import RecipeHeader from './RecipeHeader';
import RecipeImage from './RecipeImage';
import RecipeContent from './RecipeContent';
import RecipeActions from './RecipeActions';

const useStyles = makeStyles({
    card: {
        height: 443,
        width: 345
    }
});

const RecipeCardDetailed = ({ recipe, handleClose, handleDelete }) => {
    const { dispatch } = useContext(ViewContext);
    const classes = useStyles();

    const showEditView = () =>
        dispatch({ prevView: 'recipe', modalView: 'edit' });

    return (
        <RecipeCardContainer classes={classes.card}>
            <RecipeHeader
                title={recipe.title}
                subtitle={recipe.subtitle}
                action={
                    <IconButton onClick={handleClose}>
                        <Clear />
                    </IconButton>
                }
            />
            <RecipeImage imageUrl={recipe.imageUrl} />
            <RecipeContent recipe={recipe} detailed={true} />
            <RecipeActions
                handleDelete={handleDelete}
                handleEdit={showEditView}
            />
        </RecipeCardContainer>
    );
};

export default RecipeCardDetailed;
