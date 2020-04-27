import React from 'react';
import axios from 'axios';
import NewRecipeModal from '../components/Recipe/New/NewRecipeModal';

export default class RecipeController extends React.Component {
    getIngredientsArray(ingredientsStr) {
        return ingredientsStr.split(/\r?\n/);
    }

    async postNewRecipe(newRecipe, newImage) {
        newRecipe.ingredients = this.getIngredientsArray(newRecipe.ingredients);

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        if (newImage !== null) {
            await axios
                .post('/recipes/uploadImage', newImage, config)
                .then(response => {
                    newRecipe.imageUrl = response.data.imageUrl;
                    newRecipe.imageId = response.data.imageId;
                })
                .catch(error => {
                    console.log(error);
                });
        }

        await axios
            .post('/recipes/add', newRecipe)
            .then(response => {
                newRecipe._id = response.data.objectID;
                this.props.addNewRecipe(newRecipe);
                this.props.handleClose();
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <NewRecipeModal
                open={this.props.open}
                handleOpen={this.props.handleOpen}
                handleClose={this.props.handleClose}
                saveRecipe={this.postNewRecipe.bind(this)}
            />
        );
    }
}
