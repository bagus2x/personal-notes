import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { CssBaseline } from '@mui/material'
import { ConfirmProvider } from 'material-ui-confirm'
import { Toaster } from 'sonner'
import MuiThemeProvider from './components/MuiThemeProvider'
import NoteListPage from './pages/NoteListPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NoteDetailPage from './pages/NoteDetailPage'
import NoteEditorPage from './pages/NoteEditor'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <MuiThemeProvider>
      <CssBaseline />
      <Toaster richColors />
      <ConfirmProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<NoteListPage />} />
            <Route path="/note/:id" element={<NoteDetailPage />} />
            <Route path="/note" element={<NoteEditorPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </ConfirmProvider>
    </MuiThemeProvider>
  )
}

export default App
