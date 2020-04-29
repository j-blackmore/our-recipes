import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    ingredientClass: {
        display: 'flex'
    }
});

const RecipeIngredients = ({ ingredients = [] }) => {
    const { ingredientClass } = useStyles();

    return (
        <>
            <Typography gutterBottom variant="h6">
                Ingredients
            </Typography>
            {ingredients.map((ingredient, i) => {
                return (
                    <Typography
                        key={i}
                        variant="body2"
                        component="span"
                        className={ingredientClass}
                    >
                        {ingredient}
                    </Typography>
                );
            })}
        </>
    );
};

export default RecipeIngredients;
