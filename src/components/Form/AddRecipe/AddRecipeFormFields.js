import React from 'react';
import { FormControl, makeStyles } from '@material-ui/core';
import RecipeTitleInput from './RecipeTitleInput';
import RecipeSubtitleInput from './RecipeSubtitleInput';
import RecipeMethodInput from './RecipeMethodInput';
import RecipeIngredientsInput from './RecipeIngredientsInput';

const useStyles = makeStyles({
    input: {
        marginTop: 5,
        marginBottom: 5
    },
});

export default function AddRecipeFormFields(props) {
    const classes = useStyles();

    return (
        <FormControl fullWidth>
            <RecipeTitleInput classes={classes.input} title={props.newRecipe.title} handleInputChange={props.handleInputChange}/>
            <RecipeSubtitleInput classes={classes.input} subtitle={props.newRecipe.subtitle} handleInputChange={props.handleInputChange}/>
            <RecipeMethodInput classes={classes.input} method={props.newRecipe.method} handleInputChange={props.handleInputChange}/>
            <RecipeIngredientsInput classes={classes.input} ingredients={props.newRecipe.ingredients} handleInputChange={props.handleInputChange}/>
        </FormControl>
    );
}