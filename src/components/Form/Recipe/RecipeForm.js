import React from 'react';
import { CardContent, CardActions } from '@material-ui/core';
import RecipeFormInputs from './RecipeFormInputs';
import SaveRecipeButton from './SaveRecipeButton';

const classes = {
    content: {
        padding: '0px 16px 16px',
    },
    actions: {
        justifyContent: 'flex-end',
        padding: '0px 16px 16px'
    },
};

export default class RecipeForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            recipe: {},
            errors: {},
            imageData: {},
            imageName: ""
        };
    };

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
    };

    initialiseRecipe() {
        if(this.props.recipe) {
            this.setState({ recipe: this.props.recipe });
        } else {
            this.setState({
                recipe: {
                    title: "",
                    subtitle: "",
                    method: "",
                    imageUrl: "",
                    ingredients: "",
                    prepTime: "",
                    cookTime: ""
                }
            });
        }
    };

    componentDidMount() {
        this.initialiseErrorChecking();
        this.initialiseRecipe();
    };

    isValidInteger(input) {
        const intInput = parseInt(input);
        return !isNaN(intInput) && intInput >= 0;
    };

    errorsExist(errors) {
        return errors.title || errors.subtitle || errors.prepTime || errors.cookTime || errors.method || errors.ingredients;
    };

    inputHasErrors(name) {
        var extraError = false;
        if(name === "prepTime" || name === "cookTime") {
            extraError = !this.isValidInteger(this.state.recipe[name]);
        }

        return this.state.recipe[name].length <= 0 || extraError;
    };

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
    };

    validateForm() {
        const errors = {
            title: this.inputHasErrors('title'),
            subtitle: this.inputHasErrors('subtitle'),
            method: this.inputHasErrors('method'),
            ingredients: this.inputHasErrors('ingredients'),
            cookTime: this.inputHasErrors('cookTime'),
            prepTime: this.inputHasErrors('prepTime')
        };

        this.setState({errors: errors});
        return !this.errorsExist(errors);
    }

    onFormSubmit = () => {
        if(this.validateForm()) {
            this.props.saveRecipe(this.state.recipe, this.state.imageData);
        }
    };

    render() {
        const state = this.state;

        return (
            <form onSubmit={this.onFormSubmit} noValidate>
            <CardContent className={classes.content}>
                <RecipeFormInputs
                    errors={state.errors}
                    recipe={state.recipe} 
                    handleInputChange={this.handleInputChange.bind(this)} 
                    handleImageUpload={this.props.handleImageUpload} 
                    uploadedImageName={state.imageName}
                />
            </CardContent>
            <CardActions className={classes.actions}>
                <SaveRecipeButton onFormSubmit={this.onFormSubmit.bind(this)} />
            </CardActions>
        </form>
        );
    };
}
