import React, { useState } from 'react'
import {
  Switch,
  FormControlLabel,
  Dialog,
  DialogContent,
  DialogContentText,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  Paper,
} from '@material-ui/core'
import TemplateSend from './TemplateSend'

const TemplateView = ({ open, onClose, template, classes }) => {
  const [modalMaxWidth, setModalMaxWidth] = useState('md')
  const [modalFullWidth, setModalFullWidth] = useState(true)

  const handleMaxWidthChange = (event) => {
    setModalMaxWidth(event.target.value)
  }

  const handleFullWidthChange = () => {
    setModalFullWidth(!modalFullWidth)
  }

  return (
    <Dialog
      fullWidth={modalFullWidth}
      maxWidth={modalMaxWidth}
      open={open}
      onClose={onClose}
      aria-labelledby='preview-email-dialog'
    >
      <DialogContent>
        <DialogContentText>
          You can change the size of the dialog to suit different devices:
        </DialogContentText>
        <form className={classes.form} noValidate>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor='max-width'>Width</InputLabel>
            <Select
              value={modalMaxWidth}
              onChange={handleMaxWidthChange}
              inputProps={{
                name: 'max-width',
                id: 'max-width',
              }}
            >
              <MenuItem value={false}>false</MenuItem>
              <MenuItem value='xs'>xs</MenuItem>
              <MenuItem value='sm'>sm</MenuItem>
              <MenuItem value='md'>md</MenuItem>
              <MenuItem value='lg'>lg</MenuItem>
              <MenuItem value='xl'>xl</MenuItem>
            </Select>
          </FormControl>
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Switch
                checked={modalFullWidth}
                onChange={handleFullWidthChange}
                value='fullWidth'
              />
            }
            label='Full width'
          />
        </form>
        <Paper style={{ padding: '10px 20px 20px 20px' }}>
          <div dangerouslySetInnerHTML={{ __html: template.HtmlPart }} />
        </Paper>
        <Paper>
          <TemplateSend template={template} />
        </Paper>
      </DialogContent>
    </Dialog>
  )
}

export default TemplateView
