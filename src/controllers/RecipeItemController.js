import React from 'react';
import { Grid } from '@material-ui/core';
import RecipeGridItemRecipe from '../containers/Recipe/RecipeGridItemRecipe';
import RecipeGridItemAdd from '../containers/Recipe/RecipeGridItemAdd';

export default function RecipeItemController(props) {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        handleClose();
        props.deleteRecipe(props.recipe._id);
    }

    let RecipeItem;
    if(props.recipe) {
        RecipeItem = <RecipeGridItemRecipe recipe={props.recipe} handleOpen={handleOpen} handleClose={handleClose} open={open} />;
    } else if(props.newRecipe) {
        RecipeItem = <RecipeGridItemAdd addNewRecipe={props.addNewRecipe} handleOpen={handleOpen} handleClose={handleClose} open={open} />;
    }

    return (
        <Grid item xs={11} sm={5} md={4} lg={3}>
            {RecipeItem}
        </Grid>
    );
}
