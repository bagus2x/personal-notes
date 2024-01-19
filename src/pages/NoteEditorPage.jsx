import Container from '@mui/material/Container'
import NoteEditorDialog from '../components/NoteEditorDialog'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export default function NoteEditorPage() {
  const navigate = useNavigate()
  const handleSave = (note) => {
    console.log(note)
    navigate('/')
    toast.success('Note successfully added')
  }
  return (
    <Container component="main">
      <NoteEditorDialog open onSave={handleSave} />
    </Container>
  )
}
