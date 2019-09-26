import React from 'react';
import { Grid } from '@material-ui/core';
import Recipe from '../../components/Recipe/Recipe';

export default function RecipeGridItem(props) {
    
    return (
        <Grid item xs={11} sm={5} md={4} lg={3}>
            <Recipe recipe={props.recipe}/>
        </Grid>
    );
}
