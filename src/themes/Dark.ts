import { createTheme } from '@mui/material'
import { indigo, yellow, grey } from '@mui/material/colors'

export const DarkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: yellow[600],
      dark: grey[300],
      light: '#000',

      contrastText: '#FFF',
    },
    secondary: {
      main: indigo[50],
      dark: indigo[100],
      light: indigo[500],
      contrastText: '#FFF',
    },
    background: {
      default: '#303134',
      paper: '#303134',
    },
  },
})
