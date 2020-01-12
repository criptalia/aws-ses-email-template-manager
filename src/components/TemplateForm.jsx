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
  Box,
  Grid,
  Tabs,
  Tab,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from '@material-ui/core'
import {
  Check as CheckIcon,
  Save as SaveIcon,
  ExpandMore as ExpandMoreIcon,
} from '@material-ui/icons'
import TemplateView from './TemplateView'
import AceEditor from 'react-ace'
import 'brace/mode/html'
import 'brace/theme/monokai'
import styles from './TemplateFormStyles'
import TurndownService from 'turndown'
import format from 'html-format'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <Typography
      component='div'
      role='tabpanel'
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  )
}

const TemplateForm = (props) => {
  const DEFAULT_FONT_SIZE = 12

  const [templateName, setTemplateName] = useState('')
  const [subjectPart, setSubjectPart] = useState('')
  const [textPart, setTextPart] = useState('')
  const [htmlPart, setHtmlPart] = useState('')

  const [wrap, setWrap] = useState(true)
  const [fontSize, setFontSize] = useState(DEFAULT_FONT_SIZE)

  const [tabValue, setTabValue] = React.useState(0)

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

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
    console.log('onSubmit!')
    console.log(template)
    props.onSubmit(template)
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

  const formatHtml = () => {
    if (htmlPart) setHtmlPart(format(htmlPart))
  }

  const { classes, isCreate, loadingSubmit, success, errorMessage } = props

  return (
    <Fragment>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Grid container spacing={2}>
          <Grid item sm={12} md={4}>
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
          </Grid>
          <Grid item sm={12} md={8}>
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
          </Grid>
        </Grid>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'
          >
            <Typography className={classes.heading}>Text part</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
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
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </form>
      <Tabs
        value={tabValue}
        indicatorColor='primary'
        textColor='primary'
        onChange={handleTabChange}
        aria-label='Template Tabs'
      >
        <Tab label='Editor' />
        <Tab label='Preview' />
      </Tabs>
      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <div
              style={{
                marginTop: 5,
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <Button onClick={copyText}>Copy Text</Button>
                <Button onClick={formatHtml}>Format HTML</Button>
              </div>
              <div>
                <FormControlLabel
                  control={<Switch checked={wrap} onChange={toggleWrap} />}
                  label='Wrap'
                />
                <ButtonGroup
                  variant='text'
                  color='primary'
                  aria-label='text primary button group'
                >
                  <Button onClick={decreaseFontSize} disabled={fontSize < 3}>
                    -
                  </Button>
                  <Button onClick={defaultFontSize}>A</Button>
                  <Button onClick={increaseFontSize}>+</Button>
                </ButtonGroup>
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
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <TemplateView template={htmlPart} classes={classes} />
      </TabPanel>
      <div className={classes.buttonContainer}>
        <Typography className={classes.errorMessage} variant='subtitle2'>
          {errorMessage}
        </Typography>
        <div className={classes.wrapper}>
          <Fab color='primary' onClick={handleSubmit}>
            {success ? <CheckIcon /> : <SaveIcon />}
          </Fab>
          {loadingSubmit && (
            <CircularProgress size={68} className={classes.fabProgress} />
          )}
        </div>
      </div>
    </Fragment>
  )
}

export default withStyles(styles)(TemplateForm)
