import { ThemeProvider, createTheme } from '@mui/material'

const theme = createTheme({
  typography: {
    button: {
      textTransform: 'none'
    }
  },
  shape: {
    borderRadius: 16
  }
})

export default function MuiThemeProvider({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
