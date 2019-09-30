import React from 'react';
import { Modal, Backdrop, Fade } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import RecipeCardDetailed from './RecipeCardDetailed';

const useStyles = makeStyles({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)'
    },
    card: {
        width: 345,
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
                <RecipeCardDetailed recipe={props.recipe} classes={classes.card} handleClose={props.handleClose} />
            </Fade>
        </Modal>
    );
}
