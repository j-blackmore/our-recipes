import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import { Typography, useScrollTrigger } from '@material-ui/core';

const appBarStyle = {
    alignItems: 'center'
};

const Header = () => {
    const scrolling = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0
    });

    return (
        <>
            <AppBar style={appBarStyle} elevation={scrolling ? 4 : 0}>
                <ToolBar>
                    <Typography variant="h4">Our Recipes</Typography>
                </ToolBar>
            </AppBar>
            <ToolBar />
        </>
    );
};

export default Header;
