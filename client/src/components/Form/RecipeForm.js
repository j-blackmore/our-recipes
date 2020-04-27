import React from 'react';
import { CardContent, CardActions } from '@material-ui/core';
import RecipeFormInputs from './RecipeFormInputs';
import SaveRecipeButton from './SaveRecipeButton';

const classes = {
    content: {
        padding: '0px 16px 16px'
    },
    actions: {
        justifyContent: 'flex-end',
        padding: '0px 16px 16px'
    }
};

export default class RecipeForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipe: {},
            errors: {},
            imageData: null,
            imageName: ''
        };

        // convert ingredients array to a string,
        // cast timings to strings for editing so .length() validation works
        if (props.recipe) {
            Object.assign(this.state.recipe, props.recipe);
            this.state.recipe.ingredients = this.state.recipe.ingredients.join(
                '\n'
            );
            this.state.recipe.prepTime = this.state.recipe.prepTime.toString();
            this.state.recipe.cookTime = this.state.recipe.cookTime.toString();
        }
    }

    initialiseErrorChecking() {
        this.setState({
            errors: {
                title: false,
                subtitle: false,
                method: false,
                ingredients: false,
                prepTime: false,
                cookTime: false
            }
        });
    }

    initialiseRecipe() {
        if (!this.props.recipe) {
            this.setState({
                recipe: {
                    title: '',
                    subtitle: '',
                    method: '',
                    imageUrl: '',
                    iamgeId: '',
                    ingredients: '',
                    prepTime: '',
                    cookTime: ''
                }
            });
        }
    }

    componentDidMount() {
        this.initialiseRecipe();
        this.initialiseErrorChecking();
    }

    isValidInteger(input) {
        const intInput = parseInt(input);
        return !isNaN(intInput) && !isNaN(input - 0) && intInput >= 0;
    }

    errorsExist(errors) {
        return (
            errors.title ||
            errors.subtitle ||
            errors.prepTime ||
            errors.cookTime ||
            errors.method ||
            errors.ingredients
        );
    }

    inputHasErrors(name) {
        var extraError = false;
        if (name === 'prepTime' || name === 'cookTime') {
            extraError = !this.isValidInteger(this.state.recipe[name]);
        }

        return this.state.recipe[name].trim().length <= 0 || extraError;
    }

    handleInputChange(event) {
        const value = event.target.value;
        const name = event.target.name;

        let recipe = this.state.recipe;
        recipe[name] = value;
        let errors = this.state.errors;
        errors[name] = this.inputHasErrors(name);

        this.setState({
            recipe: recipe,
            errors: errors
        });
    }

    handleImageUpload(event) {
        const files = Array.from(event.target.files);
        const imageData = new FormData();
        imageData.append('recipeImage', files[0]);
        const imageName = files[0].name;

        this.setState({
            imageData: imageData,
            recipe: {
                ...this.state.recipe,
                imageUrl: '/images/' + imageName
            },
            imageName: imageName
        });
    }

    validateForm() {
        const errors = {
            title: this.inputHasErrors('title'),
            subtitle: this.inputHasErrors('subtitle'),
            method: this.inputHasErrors('method'),
            ingredients: this.inputHasErrors('ingredients'),
            cookTime: this.inputHasErrors('cookTime'),
            prepTime: this.inputHasErrors('prepTime')
        };

        this.setState({ errors: errors });
        return !this.errorsExist(errors);
    }

    onFormSubmit = () => {
        if (this.validateForm()) {
            if (this.props.noImage) {
                this.props.onSubmit(this.state.recipe);
            } else {
                this.props.onSubmit(this.state.recipe, this.state.imageData);
            }
        }
    };

    render() {
        const state = this.state;

        return (
            <form onSubmit={this.onFormSubmit} noValidate>
                <CardContent style={classes.content}>
                    <RecipeFormInputs
                        noImage={this.props.noImage}
                        errors={state.errors}
                        recipe={state.recipe}
                        handleInputChange={this.handleInputChange.bind(this)}
                        handleImageUpload={this.handleImageUpload.bind(this)}
                        uploadedImageName={state.imageName}
                    />
                </CardContent>
                <CardActions style={classes.actions}>
                    <SaveRecipeButton
                        onFormSubmit={this.onFormSubmit.bind(this)}
                    />
                </CardActions>
            </form>
        );
    }
}
