import React from 'react';
import { CardContent, CardActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import AddRecipeFormFields from './AddRecipeFormFields';
import AddRecipeButton from './AddRecipeButton';

const useStyles = makeStyles({
    content: {
        padding: '0px 16px 16px',
    },
    actions: {
        justifyContent: 'flex-end',
        padding: '0px 16px 16px'
    },
});

export default function AddRecipeForm(props) {
    const classes = useStyles();

    const onFormSubmit = () => {
        if(props.validateForm()) {
            props.saveRecipe();
        }
    };

    return (
        <form onSubmit={onFormSubmit} noValidate>
            <CardContent className={classes.content}>
                <AddRecipeFormFields
                    recipeErrors={props.recipeErrors}
                    newRecipe={props.newRecipe} 
                    handleInputChange={props.handleInputChange} 
                    handleInputBlur={props.handleInputBlur}
                    handleImageUpload={props.handleImageUpload} 
                    getUploadedImageName={props.getUploadedImageName}
                />
            </CardContent>
            <CardActions className={classes.actions}>
                <AddRecipeButton onFormSubmit={onFormSubmit} />
            </CardActions>
        </form>
    );
}
