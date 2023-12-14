import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { getNote } from '../utils/local-data'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import dayjs from 'dayjs'
import Divider from '@mui/material/Divider'
import { Interweave } from 'interweave'
import NotFoundPage from './NotFoundPage'

export default function NoteDetailPage() {
  const { id } = useParams()
  const note = useMemo(() => getNote(id), [id])

  if (!note) {
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
