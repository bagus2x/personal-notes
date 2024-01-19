import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { CssBaseline } from '@mui/material'
import { ConfirmProvider } from 'material-ui-confirm'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'
import { AuthProvider, Authenticated } from './components/Auth'
import { MuiThemeProvider } from './components/MuiThemeProvider'
import ReactQueryClientProvider from './components/QueryClientProvider'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import NoteDetailPage from './pages/NoteDetailPage'
import NoteEditorPage from './pages/NoteEditorPage'
import NoteListPage from './pages/NoteListPage'
import ProfilePage from './pages/ProfilePage'
import RegistrationPage from './pages/RegistrationPage'

function App() {
  return (
    <ReactQueryClientProvider>
      <MuiThemeProvider>
        <AuthProvider>
          <CssBaseline />
          <Toaster richColors />
          <ConfirmProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/register" element={<RegistrationPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route
                  path="/"
                  element={
                    <Authenticated>
                      <NoteListPage />
                    </Authenticated>
                  }
                />
                <Route
                  path="/note/:id"
                  element={
                    <Authenticated>
                      <NoteDetailPage />
                    </Authenticated>
                  }
                />
                <Route
                  path="/note"
                  element={
                    <Authenticated>
                      <NoteEditorPage />
                    </Authenticated>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <Authenticated>
                      <ProfilePage />
                    </Authenticated>
                  }
                />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </BrowserRouter>
          </ConfirmProvider>
        </AuthProvider>
      </MuiThemeProvider>
    </ReactQueryClientProvider>
  )
}

export default App
