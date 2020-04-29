import React, { useContext } from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import ViewContext from '../../../contexts/ViewContext';
import CardWrapper from '../../Wrappers/CardWrapper';

const useStyles = makeStyles({
    card: {
        textAlign: 'center',
        backgroundColor: 'rgb(230, 230, 230)'
    }
});

const AddRecipeCard = () => {
    const { dispatch } = useContext(ViewContext);
    const { card } = useStyles();

    const showAddModal = () => dispatch({ modalView: 'add', prevView: '' });

    return (
        <CardWrapper action className={card} onClick={() => showAddModal()}>
            <Typography variant="h2">+</Typography>
        </CardWrapper>
    );
};

export default AddRecipeCard;
