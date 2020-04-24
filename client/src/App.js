import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import MuiCustomTheme from './theme/MuiCustomTheme';
import RecipesPage from './pages/RecipesPage';

const App = () => {
    return (
        <MuiThemeProvider theme={MuiCustomTheme}>
            <RecipesPage />
        </MuiThemeProvider>
    );
};

export default App;
