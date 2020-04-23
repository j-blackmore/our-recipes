import React from 'react';
import { makeStyles, Grid } from '@material-ui/core';
import RecipeItemController from '../../controllers/RecipeItemController';

const useStyles = makeStyles({
    root: {
        flexGrow: 1
    }
});

export default function RecipeGrid(props) {
    const { recipes, deleteRecipe, updateRecipe, addNewRecipe } = props;
    const classes = useStyles();
    const spacing = 2;

    return (
        <div className={classes.root}>
            <Grid container justify="center" spacing={spacing}>
                {recipes.map(function(recipe, i) {
                    return (
                        <RecipeItemController
                            recipe={recipe}
                            key={i}
                            deleteRecipe={deleteRecipe}
                            updateRecipe={updateRecipe}
                        />
                    );
                })}
                <RecipeItemController newRecipe addNewRecipe={addNewRecipe} />
            </Grid>
        </div>
    );
}
