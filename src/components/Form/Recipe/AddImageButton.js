import React from 'react';
import { Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    input: {
        display: 'none'
    },
    fileUploaded: {
        padding: '7px 2px'
    },
    label: {
        paddingTop: 5
    }
});

export default function AddImageButton(props) {
    const classes = useStyles();

    const uploadedImageName = props.uploadedImageName;
    const fileUploadFeedback = uploadedImageName ? "Uploaded -- " + uploadedImageName : "";

    return(
        <React.Fragment>
            <input
                className={classes.input}
                name="recipeImage"
                accept="image/*"
                id="imageUpload"
                type="file"
                onChange={props.handleImageUpload}
            />
            <label htmlFor="imageUpload" className={classes.label}>
                <Button variant="contained" color="secondary" component="span">
                    Upload image
                </Button>
            </label>
            <span className={classes.fileUploaded}>{fileUploadFeedback}</span>
        </React.Fragment>
    );
}
