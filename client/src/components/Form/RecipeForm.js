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

const initRecipe = {
    title: '',
    subtitle: '',
    method: '',
    imageUrl: '',
    imageId: '',
    ingredients: '',
    prepTime: '',
    cookTime: ''
};

const initErrors = {
    title: false,
    subtitle: false,
    method: false,
    ingredients: false,
    prepTime: false,
    cookTime: false
};

export default class RecipeForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipe: props.recipe
                ? this.prepRecipeForEdit(props.recipe)
                : { ...initRecipe },
            errors: { ...initErrors },
            imageData: null,
            imageName: ''
        };
    }

    prepRecipeForEdit = recipe => {
        const { ingredients, prepTime, cookTime } = recipe;
        return {
            ...recipe,
            ingredients: ingredients.join('\n'),
            prepTime: prepTime.toString(),
            cookTime: cookTime.toString()
        };
    };

    init = () => {
        this.setState({
            recipe: { ...initRecipe },
            errors: { ...initErrors }
        });
    };

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
        const { value, name } = event.target;
        const { recipe, errors } = this.state;

        recipe[name] = value;
        errors[name] = this.inputHasErrors(name);

        this.setState({
            recipe: recipe,
            errors: errors
        });
    }

    handleImageUpload(event) {
        const uploadedImage = event.target.files[0];
        const data = new FormData();
        data.append('recipeImage', uploadedImage);

        this.setState({
            imageData: data,
            recipe: {
                ...this.state.recipe,
                imageUrl: '/images/' + uploadedImage.name
            },
            imageName: uploadedImage.name
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
            this.props.onSubmit(this.state.recipe, this.state.imageData);
            this.init();
        }
    };

    render() {
        const { errors, recipe, imageName } = this.state;
        const { noImage } = this.props;

        return (
            <form onSubmit={this.onFormSubmit} noValidate>
                <CardContent style={classes.content}>
                    <RecipeFormInputs
                        noImage={noImage}
                        errors={errors}
                        recipe={recipe}
                        handleInputChange={this.handleInputChange.bind(this)}
                        handleImageUpload={this.handleImageUpload.bind(this)}
                        uploadedImageName={imageName}
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
