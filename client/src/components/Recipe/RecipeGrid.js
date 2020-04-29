import React, { useState, useEffect, useContext } from 'react';
import { Grid } from '@material-ui/core';
import ViewContext from '../../contexts/ViewContext';
import AddRecipeCard from './AddRecipeCard';
import RecipeCard from './RecipeCard';

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

    const handleRecipeClick = recipe =>
        dispatch({ modalView: 'recipe', recipe: recipe });

    useEffect(() => {
        getRecipes();
    }, [state.modalView]);

    return (
        <Grid container justify="center" spacing={spacing}>
            {recipes.map((recipe, i) => {
                return (
                    <Grid item key={i} xs={6} sm={4} md={4} lg={3}>
                        <RecipeCard
                            recipe={recipe}
                            onClick={() => handleRecipeClick(recipe)}
                        />
                    </Grid>
                );
            })}
            <Grid item xs={6} sm={4} md={4} lg={3}>
                <AddRecipeCard updateRecipes={getRecipes} />
            </Grid>
        </Grid>
    );
};

export default RecipeGrid;
