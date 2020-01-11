import React, { Fragment, useState, useEffect } from 'react'
import {
  TextField,
  Typography,
  CircularProgress,
  Fab,
  withStyles,
  Button,
  Switch,
  FormControlLabel,
  ButtonGroup,
} from '@material-ui/core'
import { Check as CheckIcon, Save as SaveIcon } from '@material-ui/icons'
import TemplateView from './TemplateView'
import AceEditor from 'react-ace'
import 'brace/mode/html'
import 'brace/theme/monokai'
import styles from './TemplateFormStyles'
import TurndownService from 'turndown'

const TemplateForm = (props) => {
  const LABEL_PREVIEW = 'Preview'
  const DEFAULT_FONT_SIZE = 12

  const [templateName, setTemplateName] = useState('')
  const [subjectPart, setSubjectPart] = useState('')
  const [textPart, setTextPart] = useState('')
  const [htmlPart, setHtmlPart] = useState('')

  const [open, setOpen] = useState(false)
  const [wrap, setWrap] = useState(true)
  const [fontSize, setFontSize] = useState(DEFAULT_FONT_SIZE)

  useEffect(() => {
    if (props.template) {
      setTemplateName(props.template.TemplateName)
      setSubjectPart(props.template.SubjectPart)
      setTextPart(props.template.TextPart)
      setHtmlPart(props.template.HtmlPart)
    }
  }, [props.template])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const template = {
      TemplateName: templateName,
      SubjectPart: subjectPart,
      TextPart: textPart,
      HtmlPart: htmlPart,
    }
    props.onSubmit(template)
  }

  const handlePreviewOpen = () => {
    setOpen(true)
  }
  const handlePreviewClose = () => {
    setOpen(false)
  }
  const toggleWrap = () => {
    setWrap(!wrap)
  }
  const increaseFontSize = () => {
    setFontSize(fontSize + 1)
  }
  const decreaseFontSize = () => {
    setFontSize(fontSize - 1)
  }
  const defaultFontSize = () => {
    setFontSize(DEFAULT_FONT_SIZE)
  }

  const copyText = () => {
    const tdService = new TurndownService()
    const md = tdService.turndown(htmlPart)
    setTextPart(md)
  }

  const { classes, isCreate, loadingSubmit, success, errorMessage } = props
  return (
    <Fragment>
      <form onSubmit={(e) => handleSubmit(e)}>
        <TextField
          id='templateName'
          label='TemplateName'
          className={classes.textField}
          value={templateName}
          margin='normal'
          variant='outlined'
          placeholder='template-name'
          onChange={(e) => {
            setTemplateName(e.target.value)
          }}
          required
          disabled={!isCreate}
        />
        <TextField
          id='subjectPart'
          label='SubjectPart'
          className={classes.textField}
          value={subjectPart}
          margin='normal'
          variant='outlined'
          placeholder='Hi {{name}}!'
          onChange={(e) => {
            setSubjectPart(e.target.value)
          }}
          required
        />
        <TextField
          id='textPart'
          label='TextPart'
          className={classes.textField}
          value={textPart}
          margin='normal'
          variant='outlined'
          onChange={(e) => {
            setTextPart(e.target.value)
          }}
          rowsMax='6'
          multiline
        />
        <div
          style={{
            marginTop: 5,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <Button onClick={copyText}>Copy Text</Button>
          </div>
          <div>
            <FormControlLabel
              control={<Switch checked={wrap} onChange={toggleWrap} />}
              label='Wrap'
            />
            <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
              <Button onClick={decreaseFontSize} disabled={fontSize < 3}>
                -
              </Button>
              <Button onClick={defaultFontSize}>A</Button>
              <Button onClick={increaseFontSize}>+</Button>
            </ButtonGroup>
            <Button onClick={handlePreviewOpen}>{LABEL_PREVIEW}</Button>
          </div>
        </div>
        <AceEditor
          className={classes.aceEditor}
          mode='html'
          theme='monokai'
          onChange={(e) => {
            setHtmlPart(e)
          }}
          name='HtmlPart'
          value={htmlPart}
          width='100%'
          fontSize={fontSize}
          setOptions={{
            showLineNumbers: true,
            tabSize: 2,
            wrap: wrap,
            blockScrolling: 'Infinity',
          }}
        />
        <div className={classes.buttonContainer}>
          <Typography className={classes.errorMessage} variant='subtitle2'>
            {errorMessage}
          </Typography>
          <div className={classes.wrapper}>
            <Fab color='primary' type='submit'>
              {success ? <CheckIcon /> : <SaveIcon />}
            </Fab>
            {loadingSubmit && (
              <CircularProgress size={68} className={classes.fabProgress} />
            )}
          </div>
        </div>
      </form>
      <TemplateView
        template={htmlPart}
        classes={classes}
        open={open}
        onClose={handlePreviewClose}
      />
    </Fragment>
  )
}

export default withStyles(styles)(TemplateForm)
