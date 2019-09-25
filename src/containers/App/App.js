import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import Header from '../../components/Header/Header';
import MuiCustomTheme from '../../theme/MuiCustomTheme';
import "typeface-roboto";
import MainContainter from '../Main/MainContainer';

function App() {
    return (
        <MuiThemeProvider theme={MuiCustomTheme}>
            <Header/>
            <MainContainter/>
        </MuiThemeProvider>
    );
}

export default App;
