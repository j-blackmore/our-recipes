import React from 'react';
import { makeStyles, Grid } from '@material-ui/core';
import RecipeItemController from '../../controllers/RecipeItemController';

const useStyles = makeStyles({
    root: {
        flexGrow: 1
    },
});

export default function RecipeGrid(props) {
    const classes = useStyles();
    const spacing = 2;

    return (
        <div className={classes.root}>
            <Grid container justify="center" spacing={spacing}>
                <Grid container justify="center" spacing={spacing}>
                    { props.recipes.map(function(recipe, i) {
                        return <RecipeItemController recipe={recipe} key={i} deleteRecipe={props.deleteRecipe} updateRecipe={props.updateRecipe}/>
                    })}
                    <RecipeItemController newRecipe={true} addNewRecipe={props.addNewRecipe} />
                </Grid>
            </Grid>
        </div>
    );
}