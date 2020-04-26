import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import RecipeItemController from '../../controllers/RecipeItemController';
import AddRecipeCard from './AddRecipeCard';

const RecipeGrid = () => {
    const [recipes, setRecipes] = useState([]);
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

    const deleteRecipe = recipeId => {
        const postRequestOpts = {
            method: 'POST'
        };

        fetch('/recipes/delete/' + recipeId, postRequestOpts).then(
            res => {
                console.log('-- deleted recipe --');
                getRecipes();
            },
            err => console.error(err)
        );
    };

    useEffect(() => {
        getRecipes();
    }, []);

    return (
        <Grid container justify="center" spacing={spacing}>
            {recipes.map((recipe, i) => {
                return (
                    <Grid item key={i} xs={6} sm={4} md={4} lg={3}>
                        <RecipeItemController
                            recipe={recipe}
                            deleteRecipe={deleteRecipe}
                            updateRecipe={getRecipes}
                        />
                    </Grid>
                );
            })}
            <Grid item xs={6} sm={4} md={4} lg={3}>
                <AddRecipeCard addNewRecipe={getRecipes} />
            </Grid>
        </Grid>
    );
};

export default RecipeGrid;
