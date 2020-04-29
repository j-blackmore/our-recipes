import React from 'react';
import { CardHeader } from '@material-ui/core';

const RecipeHeader = ({ classes, title, subtitle, action }) => {
    return (
        <CardHeader
            className={classes}
            title={title}
            subheader={subtitle || '-'}
            action={action}
        />
    );
};

export default RecipeHeader;
