import React from 'react';
import axios from 'axios';
import NewRecipeModal from '../components/Recipe/New/NewRecipeModal';

export default class RecipeController extends React.Component {

    // Default mode is 'create' - modes: 'create' | 'edit'
    constructor(props) {
        super(props);
        this.state = {
            mode: "create"
        };
    };

    postNewRecipe(newRecipe, newImage) {
        let ingredientsStr = newRecipe.ingredients;
        let ingredients = ingredientsStr.split(/\r?\n/);
        newRecipe.ingredients = ingredients;

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        if(Object.keys(newImage).length !== 0) {
            axios.post('http://localhost:4000/recipes/uploadImage', newImage, config)
            .then(response => {
                
            })
            .catch(error => {
                console.log(error);
            });
        }

        axios.post('http://localhost:4000/recipes/add', newRecipe)
            .then(response => {
                newRecipe._id = response.data.objectID;
                this.props.addNewRecipe(newRecipe);
                this.props.handleClose();
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
                saveRecipe={this.postNewRecipe.bind(this)}
            />
        );
    };
}
