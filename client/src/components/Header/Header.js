import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import { Typography } from '@material-ui/core';
import HeaderScroll from './HeaderScroll';

const appBarStyle = {
    alignItems: 'center'
};

class Header extends React.Component {
    render() {
        return (
            <React.Fragment>
                <HeaderScroll>
                    <AppBar style={appBarStyle}>
                        <ToolBar>
                            <Typography variant="h4">Our Recipes</Typography>
                        </ToolBar>
                    </AppBar>
                </HeaderScroll>
                <ToolBar />
            </React.Fragment>
        );
    }
}

export default Header;
