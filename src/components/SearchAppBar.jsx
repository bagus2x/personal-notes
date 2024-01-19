import AddIcon from '@mui/icons-material/Add'
import Brightness4Icon from '@mui/icons-material/DarkMode'
import Brightness7Icon from '@mui/icons-material/LightMode'
import LogOutIcon from '@mui/icons-material/Logout'
import PersonIcon from '@mui/icons-material/Person'
import SearchIcon from '@mui/icons-material/Search'
import LanguageIcon from '@mui/icons-material/Language'
import AppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { alpha, styled } from '@mui/material/styles'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { useGetLoggedInUser } from '../hooks/user'
import { ACCESS_TOKEN_KEY } from '../utils/constants'
import { useAuth } from './Auth'
import { useToggleTheme } from './MuiThemeProvider'
import { Menu } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { ChangeLanguageDialog } from './ChangeLanguageDialog'
import { Link } from 'react-router-dom'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginInlineStart: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginInlineStart: theme.spacing(1),
    width: 'auto'
  }
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingInlineStart: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch'
      }
    }
  }
}))

const SearchAppBar = ({ onSearch, onAdd }) => {
  const [anchorElUser, setAnchorElUser] = useState(null)
  const { data: user } = useGetLoggedInUser()
  const auth = useAuth()
  const { mode, toggleTheme } = useToggleTheme()
  const { t } = useTranslation()
  const [openChangeLangDialog, setOpenChangeLangDialog] = useState(false)

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleLogout = () => {
    auth.setAccessToken(null)
    localStorage.removeItem(ACCESS_TOKEN_KEY)
  }

  const handleOpenChangeLangDialog = () => {
    setOpenChangeLangDialog(true)
    setAnchorElUser(null)
  }

  const handleToggleTheme = () => {
    handleCloseUserMenu()
    toggleTheme()
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary" elevation={1}>
        <Toolbar variant="dense" component={Container} maxWidth="lg">
          <Box
            sx={{ width: 32, height: 32, mr: 1 }}
            component="img"
            src="/vite.svg"
          />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Notes
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={(ev) => {
                if (onSearch) onSearch(ev.target.value)
              }}
            />
          </Search>
          <IconButton
            aria-label="Add new note"
            color="inherit"
            sx={{ ml: 1 }}
            onClick={onAdd}
          >
            <AddIcon />
          </IconButton>

          <Box sx={{ flexGrow: 0, ml: 1 }}>
            <Tooltip title={`Open ${user?.data?.name} menu`}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt={user?.data?.name}
                  src={`https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${user?.data?.name}`}
                  sx={{ width: 32, height: 32 }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuList>
                <MenuItem component={Link} to="/profile">
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText>{user?.data?.name}</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleToggleTheme}>
                  <ListItemIcon>
                    {mode === 'dark' ? (
                      <Brightness4Icon />
                    ) : (
                      <Brightness7Icon />
                    )}
                  </ListItemIcon>
                  <ListItemText>
                    {mode === 'dark' ? t('light') : t('dark')}
                  </ListItemText>
                </MenuItem>
                <MenuItem onClick={handleOpenChangeLangDialog}>
                  <ListItemIcon>
                    <LanguageIcon />
                  </ListItemIcon>
                  <ListItemText>{t('change language')}</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <LogOutIcon />
                  </ListItemIcon>
                  <ListItemText>{t('log out')}</ListItemText>
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <ChangeLanguageDialog
        open={openChangeLangDialog}
        onClose={() => setOpenChangeLangDialog(false)}
      />
    </Box>
  )
}

SearchAppBar.propTypes = {
  onSearch: PropTypes.func,
  onAdd: PropTypes.func.isRequired
}

export default SearchAppBar
