import React from 'react';
import { Container, Box } from '@material-ui/core';
import RecipeController from '../../controllers/RecipeController';

export default function MainContainter() {
    return (
        <Container maxWidth={"lg"}>
            <Box my={3}>
                <RecipeController/>
            </Box>
        </Container>
    );
}
