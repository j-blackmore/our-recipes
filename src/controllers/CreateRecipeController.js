import React from 'react';
import axios from 'axios';
import NewRecipeModal from '../components/Recipe/New/NewRecipeModal';

export default class CreateRecipeController extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { 
            newRecipe: {
                title: "",
                subtitle: "",
                method: "",
                imageUrl: "",
                ingredients: ""
            } 
        };
    };

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        let newRecipe = this.state.newRecipe;
        newRecipe[name] = value;
        this.setState(newRecipe);
    };

    validateNewRecipe() {
        return true;
    };

    postNewRecipe() {
        var newRecipe = this.state.newRecipe;
        let ingredientsStr = newRecipe.ingredients;
        let ingredients = ingredientsStr.split(/\r?\n/);
        newRecipe.ingredients = ingredients;

        axios.post('http://localhost:4000/recipes/add', newRecipe)
            .then(response => {
                this.props.addNewRecipe(newRecipe);
                this.props.handleClose();
                this.setState({
                    ...this.state,
                    newRecipe: {
                        title: "", 
                        subtitle: "", 
                        method: "", 
                        imageUrl: "", 
                        ingredients: ""
                    }
                });
            })
            .catch(error => {
                console.log(error);
            });
    };

    render() {
        return (
            <NewRecipeModal 
                open={this.props.open} 
                handleOpen={this.props.handleOpen} 
                handleClose={this.props.handleClose} 
                newRecipe={this.state.newRecipe} 
                saveRecipe={this.postNewRecipe.bind(this)}
                handleInputChange={this.handleInputChange.bind(this)}
                validateForm={this.validateNewRecipe.bind(this)}
            />
        );
    };
}
