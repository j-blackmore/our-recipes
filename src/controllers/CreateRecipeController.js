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
            },
            recipeErrors: {
                title: false,
                subtitle: false,
                method: false,
                ingredients: false
            },
            imageData: {},
            imageName: ""
        };
    };

    getUploadedImageName() {
        return this.state.imageName;
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        let newRecipe = this.state.newRecipe;
        newRecipe[name] = value;
        this.setState(newRecipe);
    };

    handleInputBlur(event) {
        const target = event.target;
        const name = target.name;

        this.setState({
            ...this.state,
            recipeErrors: {
                ...this.state.recipeErrors,
                [name]: this.state.newRecipe[name].length <= 0
            }
        });
    }

    handleImageUpload(event) {
        const files = Array.from(event.target.files);
        const imageData = new FormData();
        imageData.append('recipeImage', files[0]);
        const imageName = files[0].name;

        this.setState({
            imageData: imageData,
            newRecipe: {
                ...this.state.newRecipe,
                imageUrl: "/images/" + imageName
            },
            imageName: imageName
        });
    }

    validateNewRecipe() {
        const newRecipe = this.state.newRecipe;
        const recipeErrors = {
            title: newRecipe.title.length <= 0,
            subtitle: newRecipe.subtitle.length <= 0,
            method: newRecipe.method.length <= 0,
            ingredients: newRecipe.ingredients.length <= 0
        };

        this.setState({
            ...this.state,
            recipeErrors: recipeErrors
        });

        const hasErrors = recipeErrors.title || recipeErrors.subtitle || recipeErrors.method || recipeErrors.ingredients;
        return !hasErrors;
    };

    postNewRecipe() {
        const newImage = this.state.imageData;
        var newRecipe = this.state.newRecipe;
        let ingredientsStr = newRecipe.ingredients;
        let ingredients = ingredientsStr.split(/\r?\n/);
        newRecipe.ingredients = ingredients;

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        axios.post('http://localhost:4000/recipes/uploadImage', newImage, config)
            .then(response => {
                this.setState({
                    ...this.state,
                    imageData: {},
                    imageName: ""
                });
            })
            .catch(error => {
                console.log(error);
            });

        axios.post('http://localhost:4000/recipes/add', newRecipe)
            .then(response => {
                newRecipe._id = response.data.objectID;
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
                    },
                    recipeErrors: {
                        title: false,
                        subtitle: false,
                        method: false,
                        ingredients: false
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
                recipeErrors={this.state.recipeErrors}
                saveRecipe={this.postNewRecipe.bind(this)}
                handleInputChange={this.handleInputChange.bind(this)}
                handleInputBlur={this.handleInputBlur.bind(this)}
                validateForm={this.validateNewRecipe.bind(this)}
                handleImageUpload={this.handleImageUpload.bind(this)}
                getUploadedImageName={this.getUploadedImageName.bind(this)}
            />
        );
    };
}
