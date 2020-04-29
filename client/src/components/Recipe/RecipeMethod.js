import React from 'react';
import { Typography } from '@material-ui/core';

const RecipeMethod = ({ method }) => {
    return (
        <React.Fragment>
            <Typography gutterBottom variant="h6">
                Method
            </Typography>
            <Typography variant="body2" component="span">
                {method}
            </Typography>
        </React.Fragment>
    );
};

export default RecipeMethod;
