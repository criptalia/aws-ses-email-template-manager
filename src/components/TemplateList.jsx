import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import {
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemSecondaryAction,
  Avatar,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  IconButton,
} from '@material-ui/core'
import {
  Web as TemplateIcon,
  DeleteTwoTone as DeleteIcon,
} from '@material-ui/icons'

const styles = (theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
})

class TemplateList extends Component {
  state = {
    open: false,
    selectedToDelete: null,
  }

  handleClickOpen = (templateName) => {
    this.setState({ open: true, selectedToDelete: templateName })
  }

  handleClose = () => {
    this.setState({ open: false, selectedToDelete: null })
  }

  showListItems = (items, onClickListItem, selectedListItem) => {
    if (items.length === 0) {
      return (
        <Typography variant='body2' color='textSecondary' align='center'>
          {'No templates found.'}
        </Typography>
      )
    }

    return items.map((item, index) => {
      return (
        <ListItem
          button
          key={item.Name}
          selected={selectedListItem === index}
          onClick={() => onClickListItem(item.Name, index)}
        >
          <ListItemAvatar>
            <Avatar>
              <TemplateIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={item.Name}
            secondary={
              item.CreatedTimestamp
                ? item.CreatedTimestamp.toString()
                : 'Just now'
            }
          />
          <ListItemSecondaryAction>
            <IconButton
              aria-label='Delete'
              onClick={() => this.handleClickOpen(item.Name)}
            >
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      )
    })
  }

  resolved = (templateName) => {
    const { removeTemplate } = this.props

    this.setState({ open: false })

    removeTemplate(templateName)
  }

  rejected = () => {}

  handleOnDeleteClick = async (templateName) => {
    const { onDeleteListItem } = this.props

    await onDeleteListItem(templateName).then(
      this.resolved(templateName),
      this.rejected,
    )
  }

  render() {
    const { classes, items, selectedListItem, onClickListItem } = this.props
    const { open, selectedToDelete } = this.state

    return (
      <div>
        <List
          subheader={<ListSubheader>AWS SES Templates List</ListSubheader>}
          className={classes.root}
        >
          {this.showListItems(items, onClickListItem, selectedListItem)}
        </List>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>
            {`Are you sure you want to delete "${selectedToDelete}"?`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              Please check and if necessary make a backup copy. This action is
              not reversible!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.handleOnDeleteClick(selectedToDelete)}
              color='primary'
              autoFocus
            >
              DELETE TEMPLATE
            </Button>
            <Button onClick={this.handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

TemplateList.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(TemplateList)
