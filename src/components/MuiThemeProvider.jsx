import { ThemeProvider, createTheme } from '@mui/material'
import PropTypes from 'prop-types'
import { createContext, useContext, useMemo, useState } from 'react'
import { THEME_MODE } from '../utils/constants'
import { useTranslation } from 'react-i18next'
import { isRtlLang } from 'rtl-detect'
import rtlPlugin from 'stylis-plugin-rtl'
import { prefixer } from 'stylis'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin]
})

/**
 * @typedef {'dark' | 'light'} ThemeMode
 */

/**
 * @typedef {Object} ThemeContextValue
 * @property {ThemeMode} mode
 * @property {() => void} toggleTheme
 */

const ThemeContext = createContext()

/**
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
export const MuiThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(localStorage.getItem(THEME_MODE) || 'light')
  const {
    i18n: { language }
  } = useTranslation()

  const toggleTheme = () => {
    const newMode = mode === 'dark' ? 'light' : 'dark'
    setMode(newMode)
    localStorage.setItem(THEME_MODE, newMode)
  }

  const activeTheme = useMemo(() => {
    const direction = isRtlLang(language) ? 'rtl' : 'ltr'
    document.dir = direction
    const darkTheme = createTheme({
      direction,
      palette: {
        mode: 'dark',
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

    const lightTheme = createTheme({
      direction,
      palette: {
        mode: 'light',
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

    return mode === 'dark' ? darkTheme : lightTheme
  }, [language, mode])

  const contextValue = { mode, toggleTheme }

  return (
    <ThemeContext.Provider value={contextValue}>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={activeTheme}>{children}</ThemeProvider>
      </CacheProvider>
    </ThemeContext.Provider>
  )
}

/**
 *
 * @returns {ThemeContextValue}
 * @throws
 */
// eslint-disable-next-line react-refresh/only-export-components
export const useToggleTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

MuiThemeProvider.propTypes = {
  children: PropTypes.node.isRequired
}
