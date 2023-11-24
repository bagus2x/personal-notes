import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Checkbox from '@mui/material/Checkbox'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormControlLabel from '@mui/material/FormControlLabel'
import TextField from '@mui/material/TextField'
import { useState } from 'react'
import { toast } from 'sonner'

export default function AddNewNoteDialog({ open, onClose, onSave }) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState()
  const [archived, setArchived] = useState(false)

  const handleSave = () => {
    if (!title) {
      toast.error('Please enter the title')
      return
    }

    onSave({
      id: new Date().getTime(),
      title,
      body,
      archived,
      createdAt: new Date().toISOString()
    })

    toast.success('Note successfully added!')

    handleClose()
  }

  const handleClose = () => {
    setTitle('')
    setBody('')
    setArchived(false)
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add a new note</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Title"
          type="text"
          fullWidth
          variant="standard"
          onChange={(ev) => setTitle(ev.target.value)}
        />
        <TextField
          autoFocus
          margin="dense"
          label="Body"
          type="text"
          fullWidth
          multiline
          variant="standard"
          onChange={(ev) => setBody(ev.target.value)}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="Archived"
          checked={archived}
          onChange={(ev) => setArchived(ev.target.checked)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  )
}
