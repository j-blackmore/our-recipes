import React from 'react';
import axios from 'axios';
import NewRecipeModal from '../components/Recipe/New/NewRecipeModal';
import EditRecipeModal from '../components/Recipe/Edit/EditRecipeModal';

export default class RecipeController extends React.Component {

    getIngredientsArray(ingredientsStr) {
        return ingredientsStr.split(/\r?\n/);
    }

    postNewRecipe(newRecipe, newImage) {
        newRecipe.ingredients = this.getIngredientsArray(newRecipe.ingredients);

        const config = { 
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        if(newImage !== null) {
            axios.post('/recipes/uploadImage', newImage, config)
            .then(response => {
                
            })
            .catch(error => {
                console.log(error);
            });
        }

        axios.post('/recipes/add', newRecipe)
            .then(response => {
                newRecipe._id = response.data.objectID;
                this.props.addNewRecipe(newRecipe);
                this.props.handleClose();
            })
            .catch(error => {
                console.log(error);
            });
    };

    updateRecipe(recipe) {
        recipe.ingredients = this.getIngredientsArray(recipe.ingredients);

        axios.post('/recipes/update/' + recipe._id, recipe)
            .then(response => {
                this.props.handleClose();
                this.props.updateRecipe(recipe);
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        let Modal;
        if(this.props.mode === "edit") {
            Modal = 
                <EditRecipeModal
                    recipe={this.props.recipe}
                    editOpen={this.props.editOpen}
                    handleEditClose={this.props.handleClose}
                    handleEditOpen={this.props.handleOpen}
                    updateRecipe={this.updateRecipe.bind(this)}
                />
        } else {
            Modal = 
                <NewRecipeModal 
                    open={this.props.open} 
                    handleOpen={this.props.handleOpen} 
                    handleClose={this.props.handleClose} 
                    saveRecipe={this.postNewRecipe.bind(this)}
                />
        }

        return (
            <React.Fragment>
                {Modal}
            </React.Fragment>
        );
    };
}
