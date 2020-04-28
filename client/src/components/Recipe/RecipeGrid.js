import React, { useState, useEffect, useContext } from 'react';
import { Grid } from '@material-ui/core';
import AddRecipeCard from './AddRecipeCard';
import RecipeCard from './RecipeCard';
import Recipe from './Recipe';
import ViewContext from '../../contexts/ViewContext';

const RecipeGrid = () => {
    const { state, dispatch } = useContext(ViewContext);
    const [recipes, setRecipes] = useState([]);
    const spacing = 2;

    const getRecipes = async () => {
        console.log('-- fetch recipes --');
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
        dispatch({ view: 'item', recipe: recipe });
    };

    const closeItemView = () => {
        dispatch({ view: 'grid' });
    };

    useEffect(() => {
        getRecipes();
    }, [state.view]);

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
                <AddRecipeCard updateRecipes={getRecipes} />
            </Grid>
            <Recipe
                show={state.view === 'item'}
                recipe={state.recipe}
                handleClose={closeItemView}
                handleUpdate={openItemView}
            />
        </Grid>
    );
};

export default RecipeGrid;
