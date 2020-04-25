import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import RecipeItemController from '../../controllers/RecipeItemController';

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
            {recipes.map(function (recipe, i) {
                return (
                    <RecipeItemController
                        recipe={recipe}
                        key={i}
                        deleteRecipe={deleteRecipe}
                        updateRecipe={getRecipes}
                    />
                );
            })}
            <RecipeItemController newRecipe addNewRecipe={getRecipes} />
        </Grid>
    );
};

export default RecipeGrid;
