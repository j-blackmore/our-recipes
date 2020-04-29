import React from 'react';
import { FormControl } from '@material-ui/core';
import AddImageButton from './AddImageButton';
import InputField from './InputField';

export default function RecipeFormInputs(props) {
    const { recipe, errors, handleInputChange, noImage = false } = props;

    return (
        <FormControl fullWidth>
            <InputField
                name="title"
                value={recipe.title}
                error={errors.title}
                onChange={handleInputChange}
            />
            <InputField
                name="subtitle"
                value={recipe.subtitle}
                error={errors.subtitle}
                onChange={handleInputChange}
            />
            <InputField
                name="prepTime"
                label="Preparation Time (mins)"
                value={recipe.prepTime}
                error={errors.prepTime}
                onChange={handleInputChange}
                integer="true"
            />
            <InputField
                name="cookTime"
                label="Cooking Time (mins)"
                value={recipe.cookTime}
                error={errors.cookTime}
                onChange={handleInputChange}
                integer="true"
            />
            <InputField
                name="method"
                value={recipe.method}
                error={errors.method}
                onChange={handleInputChange}
                multiline
            />
            <InputField
                name="ingredients"
                value={recipe.ingredients}
                error={errors.ingredients}
                onChange={handleInputChange}
                multiline
                rows="6"
            />
            {!noImage && (
                <AddImageButton
                    handleImageUpload={props.handleImageUpload}
                    uploadedImageName={props.uploadedImageName}
                />
            )}
        </FormControl>
    );
}
