import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { AnimatePresence } from 'framer-motion'
import { useConfirm } from 'material-ui-confirm'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import NoteEditorDialog from '../components/NoteEditorDialog'
import CardItem from '../components/NoteItem'
import SearchAppBar from '../components/SearchAppBar'
import {
  addNote,
  archiveNote,
  deleteNote,
  editNote,
  getActiveNotes,
  getAllNotes,
  getArchivedNotes,
  unarchiveNote
} from '../utils/local-data'

export default function NoteListPage() {
  const [query, setQuery] = useState('')
  const [openDialog, setOpenDialog] = useState(false)
  const [tabValue, setTabValue] = useState(0)
  const [notes, setNotes] = useState(getAllNotes())
  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        note.title.toLowerCase().includes(query.toLowerCase()) ||
        note.body.toLowerCase().includes(query.toLowerCase())
      )
    })
  }, [notes, query])

  const refreshNotes = useCallback(() => {
    setNotes(() => {
      if (tabValue === 0) return getAllNotes()
      else if (tabValue === 1) return getActiveNotes()
      else return getArchivedNotes()
    })
  }, [tabValue])

  useEffect(() => {
    refreshNotes()
  }, [refreshNotes, tabValue])

  const confirm = useConfirm()

  const handleChangeTab = (_, newValue) => {
    setTabValue(newValue)
    refreshNotes()
  }

  const handleAddNote = (note) => {
    addNote(note)
    refreshNotes()
  }

  const handleArchive = (id) => () => {
    archiveNote(id)
    toast.success('Note is archived')
    refreshNotes()
  }

  const handleUnarchive = (id) => () => {
    unarchiveNote(id)
    toast.success('Note is not archived')
    refreshNotes()
  }

  const handleDelete = (id) => () => {
    confirm({
      title: 'Are you sure you want to delete this note?',
      description: 'This action is permanent!'
    }).then(() => {
      deleteNote(id)
      toast.success('Note successfully deleted')
      refreshNotes()
    })
  }

  const handleEdit = (note) => {
    editNote(note)
    refreshNotes()
  }

  return (
    <Box>
      <SearchAppBar onSearch={setQuery} onAdd={() => setOpenDialog(true)} />
      <NoteEditorDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSave={handleAddNote}
      />
      <Container component="main" maxWidth="lg" sx={{ marginTop: 1 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tabValue}
            onChange={handleChangeTab}
            aria-label="basic tabs example"
          >
            <Tab label="All" />
            <Tab label="Unarchived" />
            <Tab label="Archived" />
          </Tabs>
        </Box>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {filteredNotes.length === 0 &&
            (query ? (
              <Typography>
                Notes with &quot;{query}&quot; not found in this tab
              </Typography>
            ) : (
              <Typography>Notes are empty in this tab</Typography>
            ))}
          <AnimatePresence>
            {filteredNotes.map((note) => (
              <Grid item key={note.id} sm={6} xs={12} md={4} lg={3}>
                <CardItem
                  key={note.id}
                  {...note}
                  onArchive={handleArchive(note.id)}
                  onUnarchive={handleUnarchive(note.id)}
                  onDelete={handleDelete(note.id)}
                  onEdit={handleEdit}
                />
              </Grid>
            ))}
          </AnimatePresence>
        </Grid>
      </Container>
    </Box>
  )
}
