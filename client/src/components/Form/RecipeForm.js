import React from 'react';
import { CardContent, CardActions, FormControl } from '@material-ui/core';
import InputField from './InputField';
import AddImageButton from './AddImageButton';
import SaveRecipeButton from './SaveRecipeButton';
import { FormStructure } from './recipeform-config';

const classes = {
    content: {
        padding: '0px 16px 16px'
    },
    actions: {
        justifyContent: 'flex-end',
        padding: '0px 16px 16px'
    }
};

const initRecipe = {};
const initErrors = {};

FormStructure.forEach(field => {
    initRecipe[field.name] = '';
    initErrors[field.name] = false;
});

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
        const { ingredients, extras, prepTime, cookTime, serves } = recipe;
        return {
            ...recipe,
            ingredients: ingredients.join('\n'),
            extras: extras.join('\n'),
            prepTime: prepTime.toString(),
            cookTime: cookTime.toString(),
            serves: serves.toString()
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

    errorsExist = errors => {
        return Object.keys(errors).reduce(
            (hasErrors, field) => hasErrors && errors[field]
        );
    };

    inputHasErrors = name => {
        var extraError = false;
        if (['prepTime', 'cookTime', 'serves'].includes(name)) {
            extraError = !this.isValidInteger(this.state.recipe[name]);
        }

        if (name === 'extras') return false; // not a required field

        return this.state.recipe[name].trim().length <= 0 || extraError;
    };

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

    validateForm = () => {
        let newErrors = {};
        Object.keys(this.state.errors).forEach(field => {
            newErrors[field] = this.inputHasErrors(field);
        });

        this.setState({ errors: newErrors });
        return !this.errorsExist(newErrors);
    };

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
                    <FormControl fullWidth>
                        {FormStructure.map((field, i) => (
                            <InputField
                                key={i}
                                {...field}
                                value={recipe[field.name]}
                                error={errors[field.name]}
                                onChange={this.handleInputChange.bind(this)}
                            />
                        ))}
                        {!noImage && (
                            <AddImageButton
                                handleImageUpload={this.handleImageUpload.bind(
                                    this
                                )}
                                uploadedImageName={imageName}
                            />
                        )}
                    </FormControl>
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
