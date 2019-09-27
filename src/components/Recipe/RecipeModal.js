import React from 'react';
import { Modal, Backdrop, Fade } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import RecipeCard from './RecipeCard';

const useStyles = makeStyles({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)'
    }
});

// props: open, handleClose(), recipe
export default function RecipeModal(props) {
    const classes = useStyles();

    return (
        <Modal
            className={classes.modal}
            open={props.open}
            onClose={props.handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{timeout: 500, className: classes.backdrop}}            
        >
            <Fade in={props.open}>
                <RecipeCard recipe={props.recipe}/>
            </Fade>
        </Modal>
    );
}
