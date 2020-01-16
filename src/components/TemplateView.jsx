import React, { useState } from 'react'
import {
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  Paper,
  Container,
} from '@material-ui/core'
import TemplateSend from './TemplateSend'

const TemplateView = ({ template, classes }) => {
  const [viewMaxWidth, setViewMaxWidth] = useState('md')

  const handleMaxWidthChange = (event) => {
    setViewMaxWidth(event.target.value)
  }

  if (!template) return null
  return (
    <div>
      <form className={classes.form} noValidate>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor='max-width'>Width</InputLabel>
          <Select
            value={viewMaxWidth}
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
      </form>
      <Container maxWidth={viewMaxWidth}>
        <Paper style={{ padding: '10px', marginTop: '10px' }}>
          <div dangerouslySetInnerHTML={{ __html: template }} />
        </Paper>
      </Container>
      <Paper>
        <TemplateSend template={template} />
      </Paper>
    </div>
  )
}

export default TemplateView
