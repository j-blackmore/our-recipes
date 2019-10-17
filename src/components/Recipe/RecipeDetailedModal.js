import React from 'react';
import { makeStyles } from '@material-ui/styles';
import RecipeModal from './RecipeModal';
import RecipeCardDetailed from './RecipeCardDetailed';

const useStyles = makeStyles({
    card: {
        width: 345,
    },
});

export default function RecipeDetailedModal(props) {
    const classes = useStyles();

    return (
        <RecipeModal open={props.viewOpen} handleClose={props.handleViewClose}>
            <RecipeCardDetailed 
                classes={classes.card}
                recipe={props.recipe} 
                handleClose={props.handleViewClose}
                handleDelete={props.handleDelete}
            />
        </RecipeModal>
    );
}
