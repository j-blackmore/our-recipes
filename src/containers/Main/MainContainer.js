import React from 'react';
import { Container, Box, Paper, Typography } from '@material-ui/core';
import RecipeController from '../../controllers/RecipeController';

function MainContainter() {
    return (
        <Container maxWidth={"md"}>
            <Box m={10}>
                <RecipeController/>
            </Box>
        </Container>
    );
}

export default MainContainter;