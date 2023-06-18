import { createTheme } from '@mui/material'
import { lightBlue } from '@mui/material/colors'

export const LightTheme = createTheme({
  palette: {
    primary: {
      main: lightBlue[700],
      dark: lightBlue[800],
      light: lightBlue[50],
      contrastText: '#FFF',
    },
    secondary: {
      main: '#000',
      dark: '#000',
      light: '#000',
      contrastText: '#FFF',
    },
    background: {
      default: '#f7f6f3',
      paper: '#FFF',
    },
  },
})
