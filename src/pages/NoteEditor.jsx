import Container from '@mui/material/Container'
import NoteEditorDialog from '../components/NoteEditorDialog'
import { addNote } from '../utils/local-data'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export default function NoteEditorPage() {
  const navigate = useNavigate()
  const handleSave = (note) => {
    addNote(note)
    navigate('/')
    toast.success('Note successfully added')
  }
  return (
    <Container component="main">
      <NoteEditorDialog open onSave={handleSave} />
    </Container>
  )
}
