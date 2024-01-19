import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { ACCESS_TOKEN_KEY, BASE_URL } from '../utils/constants'

/**
 * @typedef {Object} CreateNoteData
 * @property {string} title
 * @property {string} body
 *
 * @typedef {Object} CreateNoteResponse
 * @property {string} status
 * @property {string} message
 * @property {Object} data
 * @property {string} data.id
 * @property {string} data.title
 * @property {string} data.body
 * @property {string} data.owner
 * @property {boolean} data.archived
 * @property {string} data.createdAt
 *
 * @returns {{
 *   mutate: (data: CreateNoteData) => Promise<CreateNoteResponse>,
 *   data: CreateNoteResponse | undefined,
 *   error: any,
 *   isError: boolean,
 *   isLoading: boolean,
 *   reset: () => void
 * }}
 */
export const useCreateNote = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationKey: ['CREATE_NOTE'],
    mutationFn: async (req) => {
      const response = await axios.post(`${BASE_URL}/notes`, req, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`
        }
      })
      return response.data
    },
    onSuccess: async () => {
      await Promise.all(
        [['GET_NOTES'], ['GET_ARCHIVED_NOTES']].map(
          async (key) =>
            await queryClient.invalidateQueries({
              queryKey: key
            })
        )
      )
    }
  })

  return mutation
}

/**
 *
 * @typedef {Object} NoteData
 * @property {string} id
 * @property {string} title
 * @property {string} body
 * @property {string} createdAt
 * @property {boolean} archived
 * @property {string} owner
 *
 * @typedef {Object} GetNotesResponse
 * @property {string} status
 * @property {string} message
 * @property {NoteData[]} data .
 *
 * @returns {{
 *   data: NoteData[] | undefined,
 *   error: any,
 *   isError: boolean,
 *   isLoading: boolean
 * }}
 */
export const useGetNotes = () => {
  const query = useQuery({
    queryKey: ['GET_NOTES'],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/notes`, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`
        }
      })
      return response.data.data
    }
  })

  return query
}

/**
 * @typedef {Object} GetArchivedNotesResponse
 * @property {string} status
 * @property {string} message
 * @property {NoteData[]} data
 *
 * @returns {{
 *   data: NoteData[] | undefined,
 *   error: any,
 *   isError: boolean,
 *   isLoading: boolean
 * }}
 */
export const useGetArchivedNotes = () => {
  const query = useQuery({
    queryKey: ['GET_ARCHIVED_NOTES'],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/notes/archived`, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`
        }
      })
      return response.data.data
    }
  })

  return query
}

/**
 * @returns {{
 *   data: NoteData | undefined,
 *   error: any,
 *   isError: boolean,
 *   isLoading: boolean
 * }}
 */
export const useGetSingleNote = (noteId) => {
  const query = useQuery({
    queryKey: ['GET_SINGLE_NOTE', noteId],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/notes/${noteId}`, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`
        }
      })
      return response.data.data
    },
    enabled: !!noteId
  })

  return query
}

/**
 * @typedef {Object} ArchiveNoteResponse
 * @property {string} status
 * @property {string} message
 *
 * @returns {{
 *   mutate: () => Promise<ArchiveNoteResponse>,
 *   data: ArchiveNoteResponse | undefined,
 *   error: any,
 *   isError: boolean,
 *   isLoading: boolean,
 *   reset: () => void
 * }}
 */
export const useArchiveNote = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationKey: ['ARCHIVE_NOTE'],
    mutationFn: async (noteId) => {
      const response = await axios.post(
        `${BASE_URL}/notes/${noteId}/archive`,
        null,
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`
          }
        }
      )
      return response.data
    },

    onSuccess: async () => {
      await Promise.all(
        [['GET_NOTES'], ['GET_ARCHIVED_NOTES']].map(
          async (key) =>
            await queryClient.invalidateQueries({
              queryKey: key
            })
        )
      )
    }
  })

  return mutation
}

/**
 * @typedef {Object} UnarchiveNoteResponse
 * @property {string} status
 * @property {string} message
 *
 * @returns {{
 *   mutate: () => Promise<UnarchiveNoteResponse>,
 *   data: UnarchiveNoteResponse | undefined,
 *   error: any,
 *   isError: boolean,
 *   isLoading: boolean,
 *   reset: () => void
 * }}
 */
export const useUnarchiveNote = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationKey: ['UNARCHIVE_NOTE'],
    mutationFn: async (noteId) => {
      const response = await axios.post(
        `${BASE_URL}/notes/${noteId}/unarchive`,
        null,
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`
          }
        }
      )
      return response.data
    },
    onSuccess: async () => {
      await Promise.all(
        [['GET_NOTES'], ['GET_ARCHIVED_NOTES']].map(
          async (key) =>
            await queryClient.invalidateQueries({
              queryKey: key
            })
        )
      )
    }
  })

  return mutation
}

/**
 * @typedef {Object} DeleteNoteResponse
 * @property {string} status
 * @property {string} message
 *
 * @returns {{
 *   mutate: () => Promise<DeleteNoteResponse>,
 *   data: DeleteNoteResponse | undefined,
 *   error: any,
 *   isError: boolean,
 *   isLoading: boolean,
 *   reset: () => void
 * }}
 */
export const useDeleteNote = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationKey: ['DELETE_NOTE'],
    mutationFn: async (noteId) => {
      const response = await axios.delete(`${BASE_URL}/notes/${noteId}`, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`
        }
      })
      return response.data
    },
    onSuccess: async () => {
      await Promise.all(
        [['GET_NOTES'], ['GET_ARCHIVED_NOTES']].map(
          async (key) =>
            await queryClient.invalidateQueries({
              queryKey: key
            })
        )
      )
    }
  })

  return mutation
}

const getAccessToken = () => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY)
  if (!accessToken) throw new Error('You must log in first')

  return accessToken
}
