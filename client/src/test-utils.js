import React from 'react';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import { render } from '@testing-library/react';
import { MuiThemeProvider } from '@material-ui/core';
import MuiCustomTheme from './theme/MuiCustomTheme';
import { ViewProvider } from './contexts/ViewContext';

const Providers = ({ children }) => {
    return (
        <MuiThemeProvider theme={MuiCustomTheme}>
            <ViewProvider>{children}</ViewProvider>
        </MuiThemeProvider>
    );
};

const customRender = (ui, options) =>
    render(ui, { wrapper: Providers, ...options });

export * from '@testing-library/react';
export { customRender as render };
