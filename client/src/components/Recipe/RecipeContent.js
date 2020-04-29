import React from 'react';
import { CardContent, makeStyles } from '@material-ui/core';
import RecipeIngredients from './RecipeIngredients';
import RecipeMethod from './RecipeMethod';
import RecipeTimings from './RecipeTimings';

const useStyles = makeStyles({
    content: {
        height: 140,
        overflow: 'scroll'
    }
});

const RecipeContent = ({
    recipe: { ingredients, method, prepTime, cookTime },
    detailed = false
}) => {
    const classes = useStyles();

    return (
        <CardContent className={classes.content}>
            <RecipeTimings prepTime={prepTime} cookTime={cookTime} />
            {detailed && (
                <>
                    <RecipeIngredients ingredients={ingredients} />
                    <RecipeMethod method={method} />
                </>
            )}
        </CardContent>
    );
};

export default RecipeContent;
