import React from 'react';
import axios from 'axios';
import RecipeGrid from '../containers/Recipe/RecipeGrid';

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
            <RecipeGrid recipes={this.state.recipes}/>
        );
    };
}

export default RecipeController;