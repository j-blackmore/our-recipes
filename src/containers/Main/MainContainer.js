import React from 'react';
import { Container, Box } from '@material-ui/core';
import RecipeController from '../../controllers/RecipeController';

function MainContainter() {
    return (
        <Container maxWidth={"md"}>
            <Box my={10}>
                <RecipeController/>
            </Box>
        </Container>
    );
}

export default MainContainter;