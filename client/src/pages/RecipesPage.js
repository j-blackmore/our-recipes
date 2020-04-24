import React from 'react';
import { Container, Box } from '@material-ui/core';
import Header from '../components/Header/Header';
import RecipesController from '../controllers/RecipesController';

const RecipesPage = () => {
    return (
        <Container maxWidth={'lg'}>
            <Header />
            <Box my={3}>
                <RecipesController />
            </Box>
        </Container>
    );
};

export default RecipesPage;
