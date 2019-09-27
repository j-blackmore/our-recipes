import React from 'react';
import { Grid } from '@material-ui/core';
import RecipeCard from '../../components/Recipe/RecipeCard';
import RecipeModal from '../../components/Recipe/RecipeModal';

export default function RecipeGridItem(props) {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };
    
    return (
        <Grid item xs={11} sm={5} md={4} lg={3}>
            <RecipeCard recipe={props.recipe} handleOpen={handleOpen} />
            <RecipeModal open={open} handleClose={handleClose} recipe={props.recipe} />
        </Grid>
    );
}
