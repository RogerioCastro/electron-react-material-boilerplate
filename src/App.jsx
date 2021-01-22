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
import { Menu as MenuIcon, Home as HomeIcon } from '@material-ui/icons'
import store from './redux/store'

import { MaterialIcon, ReduxIcon } from './components/SvgIcon'
import RouteLink from './components/RouteLink'
import HomePage from './views/HomePage'
import ReduxPage from './views/ReduxPage'
import MaterialPage from './views/MaterialPage'

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
  const { app } = store.getState()
  const { currentRoute } = app
  const [menu, setMenu] = useState(false)
  /* Pages */
  const routes = [
    {
      label: 'Home', path: '/', icon: <HomeIcon />, component: HomePage
    },
    {
      label: 'Redux', path: '/redux', icon: <ReduxIcon />, component: ReduxPage
    },
    {
      label: 'Material UI', path: '/material', icon: <MaterialIcon />, component: MaterialPage
    }
  ]

  const toggleMenu = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }
    setMenu(open)
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
        {routes.map((route) => (
          <RouteLink key={route.label} to={route.path} path={currentRoute}>
            <ListItem
              selected={currentRoute === route.path}
              button
            >
              <ListItemIcon>{route.icon}</ListItemIcon>
              <ListItemText primary={route.label} />
            </ListItem>
          </RouteLink>
        ))}
      </List>
    </div>
  )

  return (
    <Provider store={store}>
      <HashRouter>
        <Switch>
          {routes.map((route) => (
            <Route
              key={route.label}
              exact={route.path === '/'}
              path={route.path}
              component={route.component}
            />
          ))}
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
