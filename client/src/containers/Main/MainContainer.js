import React from 'react';
import { Container, Box } from '@material-ui/core';
import RecipesController from '../../controllers/RecipesController';

export default function MainContainter() {
    return (
        <Container maxWidth={"lg"}>
            <Box my={3}>
                <RecipesController/>
            </Box>
        </Container>
    );
}
