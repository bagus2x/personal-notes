import { MoreVert } from '@mui/icons-material'
import { IconButton, Menu, MenuItem } from '@mui/material'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import dayjs from 'dayjs'
import PropTypes from 'prop-types'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import NoteEditorDialog from './NoteEditorDialog'
import { motion } from 'framer-motion'

const animations = {
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0, opacity: 0 },
  transition: { type: 'spring', stiffness: 900, damping: 40 }
}

const CardItem = ({
  id,
  title,
  body,
  archived,
  createdAt,
  onArchive,
  onUnarchive,
  onDelete,
  onEdit
}) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const openMenu = Boolean(anchorEl)
  const escapedBody = useMemo(() => body.replace(/(<([^>]+)>)/gi, ''), [body])
  const [openEditor, setOpenEditor] = useState(false)

  return (
    <Card component={motion.div} {...animations}>
      <CardContent>
        <Link
          component={Link}
          to={`/note/${id}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <Typography variant="h5">{title}</Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary" variant="caption">
            {dayjs(createdAt).format('DD MMM YYYY hh:mm a')}
          </Typography>
          <div
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              width: '100%'
            }}
          >
            <Typography variant="body2" noWrap>
              {escapedBody}
            </Typography>
          </div>
        </Link>
      </CardContent>
      <CardActions sx={{ justifyContent: 'end' }}>
        {archived && (
          <Button size="small" onClick={onUnarchive}>
            Mark as unarchived
          </Button>
        )}
        {!archived && (
          <Button size="small" onClick={onArchive}>
            Mark as archived
          </Button>
        )}
        <IconButton
          id="basic-button"
          aria-controls={openMenu ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={openMenu ? 'true' : undefined}
          onClick={(event) => {
            setAnchorEl(event.currentTarget)
          }}
        >
          <MoreVert />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={openMenu}
          onClose={() => setAnchorEl(null)}
          MenuListProps={{
            'aria-labelledby': 'basic-button'
          }}
        >
          <MenuItem
            onClick={() => {
              setOpenEditor(true)
              setAnchorEl(null)
            }}
          >
            Edit
          </MenuItem>
          <MenuItem
            onClick={() => {
              setAnchorEl(null)
              onDelete?.()
            }}
          >
            Delete
          </MenuItem>
        </Menu>
      </CardActions>
      <NoteEditorDialog
        id={id}
        open={openEditor}
        onClose={() => setOpenEditor(false)}
        onSave={onEdit}
      />
    </Card>
  )
}

CardItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  createdAt: PropTypes.string.isRequired,
  onArchive: PropTypes.func,
  onUnarchive: PropTypes.func,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
}

export default CardItem
