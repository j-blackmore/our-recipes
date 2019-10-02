import React from 'react';
import axios from 'axios';
import RecipeGrid from '../containers/Recipe/RecipeGrid';

export default class RecipeController extends React.Component {

    constructor(props) {
        super(props);
        this.state = { recipes: [] };
    };

    fetchAllRecipes() {
        axios.get('http://localhost:4000/recipes/')
            .then(response => {
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

    componentDidMount() {
        this.fetchAllRecipes();
    };

    render() {
        return(
            <RecipeGrid recipes={this.state.recipes} addNewRecipe={this.addNewRecipe.bind(this)} />
        );
    };
}
