import React from 'react';
import { IconButton, makeStyles } from '@material-ui/core';
import Clear from '@material-ui/icons/Clear';
import RecipeCardContainer from '../../containers/Recipe/RecipeCardContainer';
import RecipeHeader from './RecipeHeader';
import RecipeImage from './RecipeImage';
import RecipeContent from './RecipeContent';
import RecipeActions from './RecipeActions';

const useStyles = makeStyles({
    card: {
        height: 443
    }
});

const RecipeCardDetailed = React.forwardRef((props, ref) => {
    const classes = useStyles();
    const recipe = props.recipe;
    const classList = [props.classes, classes.card].join(" ")

    return (
        <RecipeCardContainer classes={classList} >
            <RecipeHeader title={recipe.title} subtitle={recipe.subtitle} action={<IconButton onClick={props.handleClose}><Clear/></IconButton>}/>
            <RecipeImage imageUrl={recipe.imageUrl}/>
            <RecipeContent recipe={recipe} detailed={true} />
            <RecipeActions handleDelete={props.handleDelete} handleEdit={props.handleEdit} />
        </RecipeCardContainer>
    );
});

export default RecipeCardDetailed;
