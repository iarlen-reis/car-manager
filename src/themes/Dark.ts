import { createTheme } from '@mui/material'
import { lightBlue, deepOrange } from '@mui/material/colors'

export const DarkTheme = createTheme({
  palette: {
    primary: {
      main: deepOrange[700],
      dark: deepOrange[800],
      light: deepOrange[500],
      contrastText: '#FFF',
    },
    secondary: {
      main: lightBlue[700],
      dark: lightBlue[800],
      light: lightBlue[500],
      contrastText: '#FFF',
    },
    background: {
      default: '#202124',
      paper: '#303134',
    },
  },
})
