import { createTheme } from '@mui/material'
import { indigo } from '@mui/material/colors'

export const DarkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#059669',
      dark: '#047857',
      light: '#FFF',

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
