import { createMuiTheme } from '@material-ui/core/styles';

const primaryColor = '#FFCDD2';
const secondaryColor = '#FFFDE7';

const MuiCustomTheme = createMuiTheme({
    palette: {
        primary: {
            main: primaryColor,
        },
        secondary: {
            main: secondaryColor,
        },
    }
});

export default MuiCustomTheme;
