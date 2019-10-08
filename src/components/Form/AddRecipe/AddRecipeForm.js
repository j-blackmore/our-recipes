import React from 'react';
import { Box, CardContent, CardActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import AddRecipeFormFields from './AddRecipeFormFields';
import AddRecipeButton from './AddRecipeButton';

const useStyles = makeStyles({
    actions: {
        justifyContent: 'flex-end',
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
        <Box px={2}>
            <form onSubmit={onFormSubmit} noValidate>
                <CardContent>
                    <AddRecipeFormFields
                        recipeErrors={props.recipeErrors}
                        newRecipe={props.newRecipe} 
                        handleInputChange={props.handleInputChange} 
                        handleImageUpload={props.handleImageUpload} 
                        getUploadedImageName={props.getUploadedImageName}
                    />
                </CardContent>
                <CardActions className={classes.actions}>
                    <AddRecipeButton onFormSubmit={onFormSubmit} />
                </CardActions>
            </form>
        </Box>
    );
}
