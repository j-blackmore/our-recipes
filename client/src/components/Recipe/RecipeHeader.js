import React from 'react';
import { CardHeader, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    header: {
        paddingTop: 0
    }
});

const RecipeHeader = ({ classes = '', title, subtitle, action }) => {
    const classNames = useStyles();

    return (
        <CardHeader
            className={`${classNames.header} ${classes}`}
            title={title}
            subheader={subtitle || '-'}
            action={action}
        />
    );
};

export default RecipeHeader;
