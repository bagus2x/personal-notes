import { useParams } from 'react-router-dom'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import dayjs from 'dayjs'
import { Interweave } from 'interweave'
import { useGetSingleNote } from '../hooks/note'
import NotFoundPage from './NotFoundPage'
import CircularProgress from '@mui/material/CircularProgress'

export default function NoteDetailPage() {
  const { id } = useParams()
  const { data: note, isLoading } = useGetSingleNote(id)

  if (isLoading) {
    return (
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          display: 'grid',
          placeItems: 'center'
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  if (!note && !isLoading) {
    return <NotFoundPage />
  }

  return (
    <Container component="main" maxWidth="lg" sx={{ py: 2, px: 1 }}>
      <Box>
        <Typography variant="h4" component="h1">
          {note.title}
        </Typography>
        <Typography variant="caption">
          {dayjs(note.createdAt).format('DD MMM YYYY hh:mm a')}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ mt: 4 }}>
        <Interweave content={note.body} />
      </Box>
    </Container>
  )
}
