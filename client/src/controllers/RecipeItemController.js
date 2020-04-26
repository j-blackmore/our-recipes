import React from 'react';
import RecipeGridItemRecipe from '../containers/Recipe/RecipeGridItemRecipe';

export default function RecipeItemController(props) {
    const [viewOpen, setViewOpen] = React.useState(false);
    const [editOpen, setEditOpen] = React.useState(false);

    const handleViewOpen = () => setViewOpen(true);
    const handleViewClose = () => setViewOpen(false);

    const handleEditOpen = () => setEditOpen(true);
    const handleEditClose = () => setEditOpen(false);

    const handleDelete = () => {
        handleViewClose();
        props.deleteRecipe(props.recipe._id);
    };

    const handleEdit = () => {
        handleViewClose();
        handleEditOpen();
    };

    return (
        <RecipeGridItemRecipe
            recipe={props.recipe}
            handleViewOpen={handleViewOpen}
            handleViewClose={handleViewClose}
            viewOpen={viewOpen}
            handleDelete={handleDelete}
            handleEditOpen={handleEditOpen}
            handleEditClose={handleEditClose}
            editOpen={editOpen}
            handleEdit={handleEdit}
            updateRecipe={props.updateRecipe}
        />
    );
}
