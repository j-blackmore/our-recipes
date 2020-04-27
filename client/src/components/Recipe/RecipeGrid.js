import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import AddRecipeCard from './AddRecipeCard';
import RecipeCard from './RecipeCard';
import Recipe from './Recipe';

const RecipeGrid = () => {
    const [recipes, setRecipes] = useState([]);
    const [view, setView] = useState({ mode: 'grid', recipe: null });
    const spacing = 2;

    const getRecipes = async () => {
        var recipes = [];
        await fetch('/recipes')
            .then(response => response.json())
            .then(
                res => (recipes = res),
                err => console.error(err)
            );
        setRecipes(recipes);
    };

    const openItemView = recipe => {
        setView({ mode: 'item', recipe: recipe });
    };

    const closeItemView = () => {
        setView({ ...view, mode: 'grid' });
    };

    useEffect(() => {
        getRecipes();
    }, [view]);

    return (
        <Grid container justify="center" spacing={spacing}>
            {recipes.map((recipe, i) => {
                return (
                    <Grid item key={i} xs={6} sm={4} md={4} lg={3}>
                        <RecipeCard
                            recipe={recipe}
                            onClick={() => openItemView(recipe)}
                        />
                    </Grid>
                );
            })}
            <Grid item xs={6} sm={4} md={4} lg={3}>
                <AddRecipeCard addNewRecipe={getRecipes} />
            </Grid>
            <Recipe
                show={view.mode === 'item'}
                recipe={view.recipe}
                handleClose={closeItemView}
                handleUpdate={openItemView}
            />
        </Grid>
    );
};

export default RecipeGrid;
