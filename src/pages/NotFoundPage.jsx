import { Home } from '@mui/icons-material'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  const { t } = useTranslation()

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
        {t('not found')}
      </Typography>
      <Button
        component={Link}
        to="/"
        variant="outlined"
        sx={{ display: 'flex', alignItems: 'center' }}
      >
        <Home sx={{ mr: 1 }} fontSize="small" />
        <span style={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
          {t('back')}
        </span>
      </Button>
    </Container>
  )
}
