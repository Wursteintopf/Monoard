import { createTheme } from '@mui/material'
import colors from './variables/colors'

export const theme = createTheme({
  palette: {
    primary: {
      main: colors.baseBlue,
    },
    secondary: {
      main: colors.white,
    },
  },
  typography: {
    fontFamily: 'Poppins',
  },
})
