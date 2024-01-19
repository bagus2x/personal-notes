import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { AnimatePresence } from 'framer-motion'
import { useConfirm } from 'material-ui-confirm'
import { useMemo, useState } from 'react'
import { toast } from 'sonner'
import NoteEditorDialog from '../components/NoteEditorDialog'
import CardItem from '../components/NoteItem'
import SearchAppBar from '../components/SearchAppBar'
import {
  useArchiveNote,
  useCreateNote,
  useDeleteNote,
  useGetArchivedNotes,
  useGetNotes,
  useUnarchiveNote
} from '../hooks/note'
import CircularProgress from '@mui/material/CircularProgress'
import { useTranslation } from 'react-i18next'

export default function NoteListPage() {
  const [query, setQuery] = useState('')
  const [openDialog, setOpenDialog] = useState(false)
  const [tabValue, setTabValue] = useState(0)
  const { data: nonArchivedNotes, ...getNotes } = useGetNotes()
  const { data: archivedNotes, ...getArchivedNotes } = useGetArchivedNotes()
  const filtered = useMemo(() => {
    return {
      nonArchived:
        nonArchivedNotes?.filter((note) => {
          return (
            note.title.toLowerCase().includes(query.toLowerCase()) ||
            note.body.toLowerCase().includes(query.toLowerCase())
          )
        }) || [],
      archived:
        archivedNotes?.filter((note) => {
          return (
            note.title.toLowerCase().includes(query.toLowerCase()) ||
            note.body.toLowerCase().includes(query.toLowerCase())
          )
        }) || []
    }
  }, [nonArchivedNotes, archivedNotes, query])
  const notes = tabValue === 0 ? filtered.nonArchived : filtered.archived
  const create = useCreateNote()
  const archive = useArchiveNote()
  const unarchiveNote = useUnarchiveNote()
  const deleteNote = useDeleteNote()
  const confirm = useConfirm()
  const { t } = useTranslation()

  const handleChangeTab = (_, newValue) => {
    setTabValue(newValue)
  }

  const handleAddNote = (note) => {
    create.mutate(note, {
      onSuccess: () => {
        toast.success(t('note has been created'))
      }
    })
  }

  const handleArchive = (id) => () => {
    archive.mutate(id, {
      onSuccess: () => {
        toast.success(t('note has been archived'))
      }
    })
  }

  const handleUnarchive = (id) => () => {
    unarchiveNote.mutate(id, {
      onSuccess: () => {
        toast.success(t('note has been unarchived'))
      }
    })
  }

  const handleDelete = (id) => () => {
    confirm({
      title: t('are you sure you want to delete this note'),
      description: t('this action is permanent')
    }).then(() => {
      deleteNote.mutate(id, {
        onSuccess: () => {
          toast.success(t('note has been deleted'))
        }
      })
    })
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
            <Tab label={t('non archived')} />
            <Tab label={t('archived')} />
          </Tabs>
        </Box>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {notes.length === 0 &&
            (query ? (
              <Typography sx={{ textAlign: 'center', width: '100%' }}>
                {t('notes empty with query', {
                  query,
                  tab: tabValue === 0 ? t('non archived') : t('archived')
                })}
              </Typography>
            ) : (
              <Typography sx={{ textAlign: 'center', width: '100%' }}>
                {t('notes empty', {
                  tab: tabValue === 0 ? t('non archived') : t('archived')
                })}
              </Typography>
            ))}
          <AnimatePresence>
            {notes.map((note) => (
              <Grid item key={note.id} sm={6} xs={12} md={4} lg={3}>
                <CardItem
                  key={note.id}
                  {...note}
                  onArchive={handleArchive(note.id)}
                  onUnarchive={handleUnarchive(note.id)}
                  onDelete={handleDelete(note.id)}
                />
              </Grid>
            ))}
          </AnimatePresence>
        </Grid>
      </Container>
      {(getArchivedNotes.isLoading ||
        getNotes.isLoading ||
        create.isLoading ||
        archive.isLoading ||
        unarchiveNote.isLoading ||
        deleteNote.isLoading) && (
        <CircularProgress
          sx={{
            position: 'absolute',
            zIndex: 99999,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%,-50%)'
          }}
        />
      )}
    </Box>
  )
}
