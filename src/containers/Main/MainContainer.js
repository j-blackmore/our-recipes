import React from 'react';
import { Container, Box, Paper, Typography } from '@material-ui/core';
import { textAlign } from '@material-ui/system';

function MainContainter() {
    return (
        <Container maxWidth={"md"}>
            <Box m={10}>
                <Paper style={{textAlign: 'center', padding: 40}}>
                    <Typography variant="h5" component="h3">
                        Coming soon
                    </Typography>
                </Paper>
            </Box>
        </Container>
    );
}

export default MainContainter;