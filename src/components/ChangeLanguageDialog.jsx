import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText
} from '@mui/material'
import { ID, SA, US } from 'country-flag-icons/react/3x2'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { LANGUAGE } from '../utils/constants'

const languages = [
  {
    code: 'en',
    icon: US,
    name: 'English',
    dir: 'ltr'
  },
  {
    code: 'id',
    icon: ID,
    name: 'Indonesia',
    dir: 'ltr'
  },
  {
    code: 'ar',
    icon: SA,
    name: 'عرب',
    dir: 'rtl'
  }
]

export function ChangeLanguageDialog({ onClose, open }) {
  const {
    t,
    i18n: { language, changeLanguage }
  } = useTranslation()

  const handleListItemClick = (language) => {
    changeLanguage(language.code)
    localStorage.setItem(LANGUAGE, language.code)
    onClose()
  }

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>{t('choose language')}</DialogTitle>
      <List sx={{ pt: 0 }}>
        {languages.map((lng) => (
          <ListItem disableGutters key={lng.code}>
            <ListItemButton onClick={() => handleListItemClick(lng)}>
              <ListItemAvatar>
                <lng.icon />
              </ListItemAvatar>
              <ListItemText
                sx={{ marginInlineStart: 1 }}
                primary={`${lng.name} ${language === lng.code ? ' ✅' : ''}`}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  )
}

ChangeLanguageDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
}
