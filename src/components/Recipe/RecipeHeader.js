import React from 'react';
import { CardHeader } from '@material-ui/core';

export default function RecipeHeader(props) {
    return (
        <CardHeader 
            title={props.title} 
            subheader={props.subheader}
        />
    );
}
