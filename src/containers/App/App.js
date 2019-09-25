import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import Header from '../../components/Header/Header';
import MuiCustomTheme from '../../theme/MuiCustomTheme';
import "typeface-roboto";

function App() {
    return (
        <MuiThemeProvider theme={MuiCustomTheme}>
            <Header/>
        </MuiThemeProvider>
    );
}

export default App;
