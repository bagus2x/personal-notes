import React, { Component } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Checkbox from '@mui/material/Checkbox'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormControlLabel from '@mui/material/FormControlLabel'
import TextField from '@mui/material/TextField'
import { toast } from 'sonner'

class AddNewNoteDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      body: '',
      archived: false
    }
  }

  handleSave = (event) => {
    event.preventDefault()

    const { title, body, archived } = this.state

    if (!title) {
      toast.error('Please enter the title')
      return
    }

    this.props.onSave({
      id: new Date().getTime(),
      title,
      body,
      archived,
      createdAt: new Date().toISOString()
    })

    toast.success('Note successfully added!')
    this.handleClose()
  }

  handleClose = () => {
    this.setState({
      title: '',
      body: '',
      archived: false
    })
    this.props.onClose()
  }

  handleChange = (event) => {
    const { name, value, checked } = event.target

    this.setState({
      [name]: name === 'archived' ? checked : value
    })
  }

  render() {
    const { open } = this.props
    const { title, body, archived } = this.state

    return (
      <Dialog open={open} onClose={this.handleClose}>
        <form onSubmit={this.handleSave}>
          <DialogTitle>Add a new note</DialogTitle>
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
              onChange={this.handleChange}
            />
            <TextField
              autoFocus
              margin="dense"
              label="Body"
              type="text"
              fullWidth
              multiline
              variant="standard"
              name="body"
              value={body}
              onChange={this.handleChange}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Archived"
              checked={archived}
              onChange={this.handleChange}
              name="archived"
            />
          </DialogContent>
          <DialogActions>
            <Button type="button" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </DialogActions>
        </form>
      </Dialog>
    )
  }
}

export default AddNewNoteDialog
