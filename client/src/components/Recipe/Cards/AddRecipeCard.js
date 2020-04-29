import React, { useContext } from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import ViewContext from '../../../contexts/ViewContext';
import RecipeCardContainer from '../../Wrappers/RecipeCardContainer';
import RecipeCardAction from '../../Wrappers/RecipeCardAction';

const useStyles = makeStyles({
    card: {
        textAlign: 'center',
        backgroundColor: 'rgb(230, 230, 230)'
    }
});

const AddRecipeCard = () => {
    const { dispatch } = useContext(ViewContext);
    const classes = useStyles();

    const showAddModal = () => dispatch({ modalView: 'add', prevView: '' });

    return (
        <RecipeCardContainer
            classes={classes.card}
            onClick={() => showAddModal()}
        >
            <RecipeCardAction>
                <Typography variant="h2">+</Typography>
            </RecipeCardAction>
        </RecipeCardContainer>
    );
};

export default AddRecipeCard;
