import React from 'react';
import { Container, Box } from '@material-ui/core';
import { ViewProvider } from '../contexts/ViewContext';
import Header from '../components/Header/Header';
import RecipesGrid from '../components/Layout/RecipeGrid';
import ModalConductor from '../components/Modal/ModalConductor';

const RecipesPage = () => {
    return (
        <ViewProvider>
            <Container maxWidth={'lg'}>
                <Header />
                <Box my={3}>
                    <RecipesGrid />
                    <ModalConductor />
                </Box>
            </Container>
        </ViewProvider>
    );
};

export default RecipesPage;
