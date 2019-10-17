import React from 'react';
import { Grid } from '@material-ui/core';
import RecipeGridItemRecipe from '../containers/Recipe/RecipeGridItemRecipe';
import RecipeGridItemAdd from '../containers/Recipe/RecipeGridItemAdd';

export default function RecipeItemController(props) {
    const [viewOpen, setViewOpen] = React.useState(false);
    const [editOpen, setEditOpen] = React.useState(false);

    const handleViewOpen = () => {
        setViewOpen(true);
    };

    const handleViewClose = () => {
        setViewOpen(false);
    };

    const handleEditOpen = () => {
        setEditOpen(true);
    }

    const handleEditClose = () => {
        setEditOpen(false);
    }

    const handleDelete = () => {
        handleViewClose();
        props.deleteRecipe(props.recipe._id);
    }

    let RecipeItem;
    if(props.recipe) {
        RecipeItem = 
            <RecipeGridItemRecipe 
                recipe={props.recipe} 
                handleViewOpen={handleViewOpen} 
                handleViewClose={handleViewClose} 
                viewOpen={viewOpen} 
                handleDelete={handleDelete}
                handleEditOpen={handleEditOpen}
                handleEditClose={handleEditClose}
                editOpen={editOpen}
            />;
    } else if(props.newRecipe) {
        RecipeItem = 
            <RecipeGridItemAdd 
                addNewRecipe={props.addNewRecipe} 
                handleViewOpen={handleViewOpen} 
                handleViewClose={handleViewClose} 
                viewOpen={viewOpen} 
            />;
    }

    return (
        <Grid item xs={6} sm={4} md={3} lg={3}>
            {RecipeItem}
        </Grid>
    );
}
