import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import dayjs from 'dayjs'

export default function CardItem({
  title,
  body,
  archived,
  createdAt,
  onArchive,
  onUnarchive,
  onDelete
}) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{title}</Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {dayjs(createdAt).format('DD MMM YYYY hh:mm a')}
        </Typography>
        <Typography variant="body2">{body}</Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'end' }}>
        {archived && (
          <Button size="small" onClick={onUnarchive}>
            Unarchive
          </Button>
        )}
        {!archived && (
          <Button size="small" onClick={onArchive}>
            Archive
          </Button>
        )}
        <Button size="small" color="error" onClick={onDelete}>
          Delete
        </Button>
      </CardActions>
    </Card>
  )
}
