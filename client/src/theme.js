import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme(theme => ({
    overrides: {
        MuiButtonBase: {
            root: {
                textTransform: 'uppercase',
                color: 'red'
            }
        },
        MuiCssBaseline: {
            '@global': {
                html: {
                    WebkitFontSmoothing: 'auto',
                }
            },
        },
    },
}))

export default theme