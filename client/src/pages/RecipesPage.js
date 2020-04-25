import React from 'react';
import { Container, Box } from '@material-ui/core';
import Header from '../components/Header/Header';

import RecipesGrid from '../components/Recipe/RecipeGrid';

const RecipesPage = () => {
    return (
        <Container maxWidth={'lg'}>
            <Header />
            <Box my={3}>
                <RecipesGrid />
            </Box>
        </Container>
    );
};

export default RecipesPage;
