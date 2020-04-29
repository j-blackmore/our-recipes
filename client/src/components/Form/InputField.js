import React from 'react';
import { TextField, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    input: {
        marginTop: 5,
        marginBottom: 5,
        textTransform: 'capitalize'
    }
});

const InputField = props => {
    const classes = useStyles();

    let helperText = '';
    if (props.error) {
        helperText = props.integer
            ? props.value.length === 0
                ? 'Required'
                : 'This must be a positive whole number'
            : 'Required';
    }

    return (
        <TextField
            className={classes.input}
            helperText={helperText}
            label={props.name}
            fullWidth
            required
            rows={props.multiline ? '3' : '1'}
            {...props}
        />
    );
};

export default InputField;
