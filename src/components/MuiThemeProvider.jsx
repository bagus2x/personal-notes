import { ThemeProvider, createTheme } from '@mui/material'
import PropTypes from 'prop-types'

const theme = createTheme({
  palette: {
    primary: {
      main: '#6366f1'
    }
  },
  typography: {
    button: {
      textTransform: 'none'
    }
  },
  shape: {
    borderRadius: 16
  }
})

const MuiThemeProvider = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

MuiThemeProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default MuiThemeProvider
