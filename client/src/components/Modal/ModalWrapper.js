import React from 'react';
import { Modal, Backdrop, Fade, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)'
    }
});

const ModalWrapper = ({ open, handleClose, children }) => {
    const classes = useStyles();

    return (
        <Modal
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{ timeout: 500, className: classes.backdrop }}
        >
            <Fade in={open}>{children}</Fade>
        </Modal>
    );
};

export default ModalWrapper;
