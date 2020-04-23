import React from 'react';
import { render } from '@testing-library/react';
import { MuiThemeProvider } from '@material-ui/core';
import MuiCustomTheme from './theme/MuiCustomTheme';

const Providers = ({ children }) => {
    return (
        <MuiThemeProvider theme={MuiCustomTheme}>{children}</MuiThemeProvider>
    );
};

const customRender = (ui, options) =>
    render(ui, { wrapper: Providers, ...options });

export * from '@testing-library/react';
export { customRender as render };
