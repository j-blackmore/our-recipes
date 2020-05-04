import React, { useState, useEffect, useContext } from 'react';
import { Grid } from '@material-ui/core';
import ViewContext from '../../contexts/ViewContext';
import AddRecipeCard from '../Recipe/Cards/AddRecipeCard';
import RecipeCard from '../Recipe/Cards/RecipeCard';
import recipesAPI from 'recipesAPI';

const RecipesGrid = () => {
    const { state } = useContext(ViewContext);
    const [recipes, setRecipes] = useState([]);
    const spacing = 3;

    useEffect(() => {
        recipesAPI.getRecipes().then(
            res => setRecipes(res),
            err => console.error(err)
        );
    }, [state.updateRecipes]);

    return (
        <Grid container justify="center" spacing={spacing}>
            {recipes.map((recipe, i) => {
                return (
                    <Grid item key={i} xs={6} sm={4} md={4} lg={3}>
                        <RecipeCard recipe={recipe} />
                    </Grid>
                );
            })}
            <Grid item xs={6} sm={4} md={4} lg={3}>
                <AddRecipeCard />
            </Grid>
        </Grid>
    );
};

export default RecipesGrid;
