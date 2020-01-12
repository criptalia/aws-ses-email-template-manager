import React from 'react'
import { Link } from 'react-router-dom'
import {
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'
import {
  Email as EmailIcon,
} from '@material-ui/icons'

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
