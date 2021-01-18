import React, { useState } from 'react'
import {
  HashRouter,
  Redirect,
  Switch,
  Route
} from 'react-router-dom'
import { Provider } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import {
  IconButton,
  Drawer,
  Box,
  List,
  ListSubheader,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core'
import { Menu as MenuIcon, Home as HomeIcon, Storage as StorageIcon } from '@material-ui/icons'
import store from './redux/store'

import RouteLink from './components/RouteLink'
import HomePage from './views/HomePage'
import ReduxPage from './views/ReduxPage'

const useStyles = makeStyles(() => ({
  root: {
    position: 'absolute',
    top: 0,
    left: 0
  },
  menuButton: {
    color: '#b5b4b4'
  },
  menu: {
    width: 250
  }
}))

/* Application component */
function App() {
  const classes = useStyles()
  const [menu, setMenu] = useState(false)
  const [currentPath, setCurrentPath] = useState('/')

  const toggleMenu = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }
    setMenu(open)
  }

  const handleOnRouteMount = (path) => {
    setCurrentPath(path)
  }

  // Menu list
  const menuList = (
    <div
      className={classes.menu}
      role="presentation"
      onClick={toggleMenu(false)}
      onKeyDown={toggleMenu(false)}
    >
      <List>
        <ListSubheader>Pages</ListSubheader>
        {
          [
            { label: 'Home', path: '/', icon: <HomeIcon /> },
            { label: 'Redux example', path: '/redux', icon: <StorageIcon /> }
          ].map((menuItem) => (
            <RouteLink key={menuItem.label} to={menuItem.path} path={currentPath}>
              <ListItem
                selected={currentPath === menuItem.path}
                button
              >
                <ListItemIcon>{menuItem.icon}</ListItemIcon>
                <ListItemText primary={menuItem.label} />
              </ListItem>
            </RouteLink>
          ))
        }
      </List>
    </div>
  )

  return (
    <Provider store={store}>
      <HashRouter>
        <Switch>
          <Route exact path="/" render={(props) => <HomePage {...props} onMount={handleOnRouteMount} />} />
          <Route path="/redux" render={(props) => <ReduxPage {...props} onMount={handleOnRouteMount} />} />
          <Route render={() => <Redirect to="/" />} />
        </Switch>
        <Drawer anchor="left" open={menu} onClose={toggleMenu(false)}>
          {menuList}
        </Drawer>
      </HashRouter>
      <Box component="div" className={classes.root}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={toggleMenu(true)}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
      </Box>
    </Provider>
  )
}

export default App
