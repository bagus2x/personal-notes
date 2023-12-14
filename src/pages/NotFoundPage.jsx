import { Home } from '@mui/icons-material'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <Container
      maxWidth="xl"
      sx={{
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Typography variant="h3" component="h1">
        Not Found
      </Typography>
      <Button
        component={Link}
        to="/"
        variant="outlined"
        sx={{ display: 'flex', alignItems: 'center' }}
      >
        <Home sx={{ mr: 1 }} fontSize="small" />
        <span style={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
          Back
        </span>
      </Button>
    </Container>
  )
}
