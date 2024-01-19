import { createContext, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { ACCESS_TOKEN_KEY } from '../utils/constants'
import { useNavigate } from 'react-router-dom'

/**

/**
 * @typedef {Object} AuthData
 * @property {string | null} accessToken
 * @property {() => void} setAccessToken
 */

/**
 * @type {import("react").Context<AuthData>}
 */
const AuthContext = createContext({
  accessToken: localStorage.getItem(ACCESS_TOKEN_KEY),
  setAccessToken: () => {}
})

/**
 * Provider for AuthContext to manage authentication data.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem(ACCESS_TOKEN_KEY)
  )

  const contextValue = { accessToken, setAccessToken }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
}

/**
 * Hook to use AuthContext value.
 *
 * @returns {AuthData}
 * @throws
 */
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

// Protect children. check if user is not authenticated thren redirect to login page.
export const Authenticated = ({ children }) => {
  const navigate = useNavigate()
  const auth = useAuth()
  useEffect(() => {
    if (!auth.accessToken) {
      navigate('/login', { replace: true })
    }
  }, [auth, navigate])

  if (!auth.accessToken) {
    return null
  }

  return <>{children}</>
}

Authenticated.propTypes = {
  children: PropTypes.node.isRequired
}
