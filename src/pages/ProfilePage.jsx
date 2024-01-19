import { Box, CircularProgress, Container, Typography } from '@mui/material'
import { useGetLoggedInUser } from '../hooks/user'

export default function ProfilePage() {
  const { data: user, ...getLoggedInUser } = useGetLoggedInUser()

  return (
    <Box component="main" sx={{ width: '100vw', p: 4 }}>
      <Container
        maxWidth="md"
        sx={{
          display: 'flex',
          flexDirection: 'column',

          alignItems: 'center'
        }}
      >
        <Box
          component="img"
          src={`https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${user?.data?.name}`}
          sx={{ width: 240, height: 240, borderRadius: '100%', mb: 4 }}
        />
        <Typography variant="h4">{user?.data?.name}</Typography>
        <Typography variant="h6">{user?.data?.email}</Typography>
      </Container>
      {getLoggedInUser.isLoading && (
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
