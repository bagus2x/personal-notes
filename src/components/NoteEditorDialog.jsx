import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { Fullscreen } from '@mui/icons-material'
import { Box, IconButton } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useGetSingleNote } from '../hooks/note'

const NoteEditorDialog = ({ id, open, onSave, onClose }) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { data: note } = useGetSingleNote(id)
  const [title, setTitle] = useState(note?.title || '')
  const [body, setBody] = useState(note?.body || '')
  const navigate = useNavigate()

  useEffect(() => {
    if (open) {
      setTitle(note?.title || '')
      setBody(note?.body || '')
    }
  }, [open, note])

  const handleSave = (event) => {
    event.preventDefault()

    if (!title) {
      toast.error('Please enter the title')
      return
    }

    onSave({
      id,
      title,
      body
    })

    toast.success('Note successfully saved!')
    handleClose()
  }

  const handleClose = () => {
    setTitle('')
    setBody('')
    if (onClose) {
      onClose()
    } else {
      navigate('/')
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth={!onClose}
      maxWidth="xl"
    >
      <form onSubmit={handleSave}>
        <DialogTitle
          component={'div'}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <span>Note Editor</span>
          {onClose && (
            <Link to="/note">
              <IconButton>
                <Fullscreen />
              </IconButton>
            </Link>
          )}
        </DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            name="title"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
          />
          <Box sx={{ my: 2, color: 'black' }}>
            <CKEditor
              editor={ClassicEditor}
              data={body}
              onChange={(_, editor) => {
                setBody(editor.getData())
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button type="button" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

NoteEditorDialog.propTypes = {
  id: PropTypes.string,
  open: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func
}

export default NoteEditorDialog
