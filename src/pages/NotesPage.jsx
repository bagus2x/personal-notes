import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { useConfirm } from 'material-ui-confirm'
import { useMemo, useState } from 'react'
import { toast } from 'sonner'
import AddNewNoteDialog from '../components/AddNewNoteModal'
import CardItem from '../components/NoteItem'
import SearchAppBar from '../components/SearchAppBar'
import { getInitialData } from '../utils'

export default function NotesPage() {
  const [query, setQuery] = useState('')
  const [openDialog, setOpenDialog] = useState(false)
  const [tabValue, setTabValue] = useState(0)
  const [notes, setNotes] = useState(getInitialData())
  const confirm = useConfirm()
  const archivedNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        note.archived &&
        (note.title.toLowerCase().includes(query.toLowerCase()) ||
          note.body.toLowerCase().includes(query.toLowerCase()))
      )
    })
  }, [query, notes])
  const activeNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        !note.archived &&
        (note.title.toLowerCase().includes(query.toLowerCase()) ||
          note.body.toLowerCase().includes(query.toLowerCase()))
      )
    })
  }, [query, notes])

  const handleChangeTab = (_, newValue) => {
    setTabValue(newValue)
  }

  const handleSaveNote = (note) => {
    setNotes((prev) => [note, ...prev])
    if (note.archived) setTabValue(1)
    else setTabValue(0)
  }

  const handleArchive = (id) => () => {
    setNotes((prev) =>
      prev.map((note) => {
        return note.id === id ? { ...note, archived: true } : note
      })
    )
    toast.success('Note is archived')
  }

  const handleUnarchive = (id) => () => {
    setNotes((prev) =>
      prev.map((note) => {
        return note.id === id ? { ...note, archived: false } : note
      })
    )
    toast.success('Note is not archived')
  }

  const handleDelete = (id) => () => {
    confirm({
      title: 'Are you sure you want to delete this note?',
      description: 'This action is permanent!'
    }).then(() => {
      setNotes((prev) => prev.filter((note) => note.id !== id))
      toast.success('Note successfully deleted')
    })
  }

  return (
    <Box>
      <SearchAppBar onSearch={setQuery} onAdd={() => setOpenDialog(true)} />
      <AddNewNoteDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSave={handleSaveNote}
      />
      <Container component="main" maxWidth="lg" sx={{ marginTop: 1 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tabValue}
            onChange={handleChangeTab}
            aria-label="basic tabs example"
          >
            <Tab label="Active" />
            <Tab label="Archived" />
          </Tabs>
        </Box>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {tabValue === 0 && activeNotes.length === 0 && (
            <Grid item xs={12}>
              <Typography variant="body1">No active notes found</Typography>
              {query && (
                <Typography variant="caption">for query "{query}"</Typography>
              )}
            </Grid>
          )}
          {tabValue === 1 && archivedNotes.length === 0 && (
            <Grid item xs={12}>
              <Typography variant="body1">No archived notes found</Typography>
              {query && (
                <Typography variant="caption">for query "{query}"</Typography>
              )}
            </Grid>
          )}
          {tabValue === 0 &&
            activeNotes.map((note) => (
              <Grid item key={note.id} xs={12} sm={6} md={4} lg={3}>
                <CardItem
                  key={note.id}
                  {...note}
                  onArchive={handleArchive(note.id)}
                  onDelete={handleDelete(note.id)}
                />
              </Grid>
            ))}
          {tabValue === 1 &&
            archivedNotes.map((note) => (
              <Grid item key={note.id} sm={6} xs={12} md={4} lg={3}>
                <CardItem
                  key={note.id}
                  {...note}
                  onUnarchive={handleUnarchive(note.id)}
                  onDelete={handleDelete(note.id)}
                />
              </Grid>
            ))}
        </Grid>
      </Container>
    </Box>
  )
}
