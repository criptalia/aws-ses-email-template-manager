import React from 'react'
import { Link } from 'react-router-dom'
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@material-ui/core'
import {
  AirlineSeatIndividualSuite as LogoutIcon,
  Email as EmailIcon,
} from '@material-ui/icons/Email'

export const mainListItems = (
  <Link to='/templates' style={{ textDecoration: 'none', color: '#000' }}>
    <ListItem button selected>
      <ListItemIcon>
        <EmailIcon />
      </ListItemIcon>
      <ListItemText primary='Templates' />
    </ListItem>
  </Link>
)

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Other options</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary='Close session' />
    </ListItem>
  </div>
)
