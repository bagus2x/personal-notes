import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { ACCESS_TOKEN_KEY, BASE_URL } from '../utils/constants'
import { useAuth } from '../components/Auth'

/**
 * @typedef {Object} RegistrationData
 * @property {string} name
 * @property {string} email 
 * @property {string} password 
 * 
 * @typedef {Object} RegistrationResponse
 * @property {string} status 
 * @property {string} message


 * @returns {{
 *   mutate: (data: RegistrationData) => Promise<RegistrationResponse>,
 *   data: RegistrationResponse | undefined,
 *   error: any,
 *   isError: boolean,
 *   isLoading: boolean,
 *   isSuccess: boolean,
 *   reset: () => void
 * }}
 */
export const useRegister = () => {
  /**
   * @type {import('@tanstack/react-query').UseMutationResult<RegistrationResponse, any, RegistrationData>}
   */
  const mutation = useMutation({
    /**
     * @type {string | [string, any]}
     */
    mutationKey: ['REGISTER'],

    /**
     * @type {import('@tanstack/react-query').MutationFunction<RegistrationResponse, RegistrationData>}
     * @param {RegistrationData} req
     * @returns {Promise<RegistrationResponse>}
     */
    mutationFn: async (req) => {
      const response = await axios.post(`${BASE_URL}/register`, req)
      return response.data
    }
  })

  return mutation
}

/**
 * @typedef {Object} LoginData
 * @property {string} email
 * @property {string} password
 *
 * @typedef {Object} LoginResponse
 * @property {string} status
 * @property {string} message
 * @property {Object} data
 * @property {string} data.accessToken
 *
 * @returns {{
 *   mutate: (data: LoginData) => Promise<LoginResponse>,
 *   data: LoginResponse | undefined,
 *   error: any,
 *   isError: boolean,
 *   isLoading: boolean,
 *   isSuccess: boolean,
 *   reset: () => void
 * }}
 */
export const useLogin = () => {
  /**
   * @type {import('@tanstack/react-query').UseMutationResult<LoginResponse, any, LoginData>}
   */
  const mutation = useMutation({
    /**
     * @type {string | [string, any]}
     */
    mutationKey: ['LOGIN'],

    /**
     * @type {import('@tanstack/react-query').MutationFunction<LoginResponse, LoginData>}
     * @param {LoginData} req
     * @returns {Promise<LoginResponse>}
     */
    mutationFn: async (req) => {
      const response = await axios.post(`${BASE_URL}/login`, req)
      return response.data
    },
    onSuccess: ({ data }) => {
      localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken)
    }
  })

  return mutation
}

/**
 * @typedef {Object} LoggedInUserData
 * @property {string} id
 * @property {string} name
 * @property {string} email
 *
 * @typedef {Object} LoggedInUserResponse
 * @property {string} status
 * @property {string} message
 * @property {LoggedInUserData} data
 *
 * @returns {{
 *   data: LoggedInUserResponse | undefined,
 *   error: any,
 *   isError: boolean,
 *   isLoading: boolean
 * }}
 */
export const useGetLoggedInUser = () => {
  const auth = useAuth()
  /**
   * @type {import('@tanstack/react-query').UseQueryResult<LoggedInUserResponse, any>}
   */
  const query = useQuery({
    /**
     * @type {string | [string, any]}
     */
    queryKey: ['LOGGED_IN_USER'],

    /**
     * @type {import('@tanstack/react-query').QueryFunction<LoggedInUserResponse>}
     * @returns {Promise<LoggedInUserResponse>}
     */
    queryFn: async () => {
      const accessToken = getAccessToken()

      const response = await axios.get(`${BASE_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      return response.data
    },
    enabled: !!auth.accessToken
  })

  return query
}

const getAccessToken = () => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY)
  if (!accessToken) throw new Error('You must log in first')

  return accessToken
}
