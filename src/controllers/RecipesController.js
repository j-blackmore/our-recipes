import React from 'react';
import axios from 'axios';
import RecipeGrid from '../containers/Recipe/RecipeGrid';

export default class RecipesController extends React.Component {

    constructor(props) {
        super(props);
        this.state = { recipes: [] };
    };

    fetchAllRecipes() {
        axios.get('http://localhost:4000/recipes/')
            .then(response => {
                const newRecipes = response.data;
                newRecipes.map(recipe => {
                    recipe.cookTime = parseInt(recipe.cookTime);
                    recipe.prepTime = parseInt(recipe.prepTime);
                    return recipe;
                });
                this.setState({ recipes: response.data });
            })
            .catch(error => {
                console.log(error);
            });
    };

    addNewRecipe(newRecipe) {
        var recipes = this.state.recipes;
        recipes.push(newRecipe);

        this.setState(recipes);
    };

    deleteRecipe(recipeId) {
        axios.post('http://localhost:4000/recipes/delete/' + recipeId)
            .then(response => {
                let recipes = this.state.recipes;
                recipes.splice(recipes.findIndex((recipe) => {
                    return recipe._id === recipeId;
                }), 1);

                this.setState({
                    ...this.state,
                    recipes: recipes
                });
            })
            .catch(error => {
                console.log(error);
            });
    };

    componentDidMount() {
        this.fetchAllRecipes();
    };

    render() {
        return(
            <RecipeGrid 
                recipes={this.state.recipes} 
                addNewRecipe={this.addNewRecipe.bind(this)} 
                deleteRecipe={this.deleteRecipe.bind(this)}
            />
        );
    };
}
