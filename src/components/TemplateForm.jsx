import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  TextField,
  Typography,
  CircularProgress,
  Fab,
  withStyles,
  Button,
  Switch,
  FormControlLabel,
} from '@material-ui/core'
import { Check as CheckIcon, Save as SaveIcon } from '@material-ui/icons'
import TemplateView from './TemplateView'
import AceEditor from 'react-ace'
import 'brace/mode/html'
import 'brace/theme/monokai'
import styles from './TemplateFormStyles'

const LABEL_PREVIEW = 'Preview'
const DEFAULT_FONT_SIZE = 12

class TemplateForm extends PureComponent {
  state = {
    template: {
      TemplateName: '',
      SubjectPart: '',
      TextPart: '',
      HtmlPart: '',
    },
    open: false,
    modalFullWidth: true,
    wrap: true,
    fontSize: DEFAULT_FONT_SIZE,
  }

  componentWillReceiveProps(nextProps) {
    const { template } = nextProps

    if (template) {
      this.setState({
        template: {
          TemplateName: template.TemplateName,
          SubjectPart: template.SubjectPart,
          TextPart: template.TextPart,
          HtmlPart: template.HtmlPart,
        },
      })
    }
  }

  handleChange = (name) => (event) => {
    const { template } = this.state
    this.setState({
      template: Object.assign({}, template, {
        [name]: name === 'HtmlPart' ? event : event.target.value,
      }),
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault()

    const { onSubmit } = this.props
    const { template } = this.state

    onSubmit(template)
  }

  handlePreviewOpen = () => {
    this.setState({ open: true })
  }

  handlePreviewClose = () => {
    this.setState({ open: false })
  }

  toggleWrap = () => {
    this.setState({
      wrap: !this.state.wrap,
    })
  }

  increaseFontSize = () => {
    this.setState({
      fontSize: this.state.fontSize + 1,
    })
  }

  decreaseFontSize = () => {
    this.setState({
      fontSize: this.state.fontSize - 1,
    })
  }

  defaultFontSize = () => {
    this.setState({
      fontSize: DEFAULT_FONT_SIZE,
    })
  }

  render() {
    const {
      classes,
      isCreate,
      loadingSubmit,
      success,
      errorMessage,
    } = this.props
    const { template } = this.state
    return (
      <Fragment>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <TextField
            id='outlined-name'
            label='TemplateName'
            className={classes.textField}
            value={template.TemplateName}
            margin='normal'
            variant='outlined'
            placeholder='template-name'
            onChange={this.handleChange('TemplateName')}
            required
            disabled={!isCreate}
          />
          <TextField
            id='outlined-name'
            label='SubjectPart'
            className={classes.textField}
            value={template.SubjectPart}
            margin='normal'
            variant='outlined'
            placeholder='Hi {{name}}!'
            onChange={this.handleChange('SubjectPart')}
            required
          />
          <TextField
            id='outlined-name'
            label='TextPart'
            className={classes.textField}
            value={template.TextPart}
            margin='normal'
            variant='outlined'
            onChange={this.handleChange('TextPart')}
            rowsMax='6'
            multiline
          />
          <div
            style={{
              marginTop: 5,
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <FormControlLabel
              control={
                <Switch checked={this.state.wrap} onChange={this.toggleWrap} />
              }
              label='Wrap'
            />
            <Button onClick={this.decreaseFontSize}>-</Button>
            <Button onClick={this.defaultFontSize}>A</Button>
            <Button onClick={this.increaseFontSize}>+</Button>
            <Button onClick={this.handlePreviewOpen}>{LABEL_PREVIEW}</Button>
          </div>
          <AceEditor
            className={classes.aceEditor}
            mode='html'
            theme='monokai'
            onChange={this.handleChange('HtmlPart')}
            name='HtmlPart'
            value={template.HtmlPart}
            width='100%'
            fontSize={this.state.fontSize}
            setOptions={{
              enableBasicAutocompletion: true,
              showLineNumbers: true,
              tabSize: 2,
              wrap: this.state.wrap,
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
          template={template}
          classes={classes}
          open={this.state.open}
          onClose={this.handlePreviewClose}
        />
      </Fragment>
    )
  }
}

TemplateForm.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(TemplateForm)
