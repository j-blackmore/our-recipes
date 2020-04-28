import React from 'react';
import { Container, Box } from '@material-ui/core';
import { ViewProvider } from '../contexts/ViewContext';
import Header from '../components/Header/Header';
import RecipesGrid from '../components/Recipe/RecipeGrid';

const RecipesPage = () => {
    return (
        <ViewProvider>
            <Container maxWidth={'lg'}>
                <Header />
                <Box my={3}>
                    <RecipesGrid />
                </Box>
            </Container>
        </ViewProvider>
    );
};

export default RecipesPage;
