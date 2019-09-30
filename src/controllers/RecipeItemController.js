import React from 'react';
import { Grid } from '@material-ui/core';
import RecipeGridItemRecipe from '../containers/Recipe/RecipeGridItemRecipe';

export default function RecipeItemController(props) {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Grid item xs={11} sm={5} md={4} lg={3}>
            <RecipeGridItemRecipe recipe={props.recipe} handleOpen={handleOpen} handleClose={handleClose} open={open}/>
        </Grid>
    );
}