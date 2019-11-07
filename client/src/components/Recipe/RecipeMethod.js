import React from 'react';
import { Typography } from '@material-ui/core';

export default function RecipeMethod(props) {
    return (
        <React.Fragment>
            <Typography gutterBottom variant="h6">
                Method
            </Typography>
            <Typography variant="body2" component="span">
                {props.method}
            </Typography>
        </React.Fragment>
    );
}
