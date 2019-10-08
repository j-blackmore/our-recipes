import React from 'react';
import { CardHeader } from '@material-ui/core';

export default function RecipeHeader(props) {
    return (
        <CardHeader 
            className={props.classes}
            title={props.title} 
            subheader={props.subtitle}
            action={props.action}
        />
    );
}
