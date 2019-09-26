import React from 'react';
import axios from 'axios';
import Recipe from '../components/Recipe/Recipe';

class RecipeController extends React.Component {

    constructor(props) {
        super(props);
        this.state = { recipes: [] };
    }

    fetchAllRecipes() {
        axios.get('http://localhost:4000/recipes/')
            .then(response => {
                this.setState({ recipes: response.data });
            })
            .catch(error => {
                console.log(error);
            });
    }

    componentDidMount() {
        this.fetchAllRecipes();
    };

    render() {
        return(
            this.state.recipes.map(function(recipe, i) {
                return <Recipe recipe={recipe} key={i} />
            })
        );
    };
}

export default RecipeController;