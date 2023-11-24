import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { CssBaseline } from '@mui/material'
import { ConfirmProvider } from 'material-ui-confirm'
import { Toaster } from 'sonner'
import MuiThemeProvider from './components/MuiThemeProvider'
import NotesPage from './pages/NotesPage'

function App() {
  return (
    <MuiThemeProvider>
      <CssBaseline />
      <Toaster richColors />
      <ConfirmProvider>
        <NotesPage />
      </ConfirmProvider>
    </MuiThemeProvider>
  )
}

export default App
