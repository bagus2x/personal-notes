import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { Box, IconButton } from '@mui/material'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormControlLabel from '@mui/material/FormControlLabel'
import TextField from '@mui/material/TextField'
import PropTypes from 'prop-types'
import { useMemo, useState } from 'react'
import { toast } from 'sonner'
import { getNote } from '../utils/local-data'
import { useEffect } from 'react'
import { Fullscreen } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'

const NoteEditorDialog = ({ id, open, onSave, onClose }) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const note = useMemo(() => getNote(id), [id, open])
  const [title, setTitle] = useState(note?.title || '')
  const [body, setBody] = useState(note?.body || '')
  const [archived, setArchived] = useState(!!note?.archived)
  const navigate = useNavigate()

  useEffect(() => {
    if (open) {
      setTitle(note?.title || '')
      setBody(note?.body || '')
      setArchived(!!note?.archived)
    }
  }, [open, note])

  const handleSave = (event) => {
    event.preventDefault()

    if (!title) {
      toast.error('Please enter the title')
      return
    }

    onSave({
      id: id || new Date().getTime(),
      title,
      body,
      archived,
      createdAt: new Date().toISOString()
    })

    toast.success('Note successfully saved!')
    handleClose()
  }

  const handleClose = () => {
    setTitle('')
    setBody('')
    setArchived(false)
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
          <Box sx={{ my: 2 }}>
            <CKEditor
              editor={ClassicEditor}
              data={body}
              onChange={(_, editor) => {
                setBody(editor.getData())
              }}
            />
          </Box>
          <FormControlLabel
            control={<Checkbox />}
            label="Archived"
            checked={archived}
            onChange={(ev) => setArchived(ev.target.checked)}
            name="archived"
          />
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
