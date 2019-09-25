import React from 'react';
import { Container, Box, Paper, Typography } from '@material-ui/core';
import Recipe from '../../components/Recipe/Recipe';

function MainContainter() {
    return (
        <Container maxWidth={"md"}>
            <Box m={10}>
                <Recipe/>
            </Box>
        </Container>
    );
}

export default MainContainter;