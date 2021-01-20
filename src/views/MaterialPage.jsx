import React, {
  useState,
  useEffect,
  createRef,
  forwardRef
} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import {
  ArrowBack as ArrowBackIcon,
  AlarmOn as AlarmOnIcon
} from '@material-ui/icons'
import {
  Container,
  Typography,
  Divider,
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Collapse,
  Slide,
  Tooltip
} from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import { ReduxHelpers } from '../core/Helpers'

/* Reusing a theme provider, when it cannot be used in the App */
import DarkThemeProvider from '../components/DarkThemeProvider'
import ScrollToTop from '../components/ScrollToTop'

const topHeight = 50

/* Custom Alert */
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

/* Snack transition */
function SlideTransition(props) {
  return <Slide {...props} direction="down" />
}

/* Dialog transition */
const DialogTransition = forwardRef((props, ref) => (<Slide direction="down" ref={ref} {...props} />))

/* Custom tooltip (light) */
const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))(Tooltip)

/* Custom tooltip style (Bootstrap) */
const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
  },
}))

/* Custom tooltip (Bootstrap) */
function BootstrapTooltip(props) {
  const classes = useStylesBootstrap()

  return <Tooltip arrow classes={classes} {...props} />
}

/* Custom tooltip (HTML) */
const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9'
  },
}))(Tooltip)

const useStyles = makeStyles((theme) => ({
  root: {
    color: '#ffffff',
    marginTop: topHeight,
    maxHeight: `calc(100vh - ${topHeight}px)`,
    overflowY: 'auto'
  },
  container: {
    flexGrow: 1,
  },
  title: {
    marginBottom: theme.spacing(3)
  },
  grid: {
    marginBottom: 15
  },
  gridItem: {
    backgroundColor: '#17323c',
    borderRadius: 5,
    '& .MuiTypography-caption': {
      textAlign: 'right',
      paddingTop: 5
    },
    '& .bottom': {
      marginTop: 10
    },
    '& .buttons': {
      textAlign: 'center',
      '& > *': {
        margin: theme.spacing(1)
      }
    },
    '& .snackbar': {
      textAlign: 'center',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
      '& .custom-alert': {
        backgroundColor: '#ffffff',
        color: '#694986'
      }
    },
    '& .tooltips': {
      textAlign: 'center',
      '& > *': {
        margin: theme.spacing(1)
      }
    }
  },
  footer: {
    textAlign: 'center'
  }
}))

function MaterialPage(props) {
  const classes = useStyles()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  // Used to hide the Alert
  const [collapseOpen, setCollapseOpen] = useState(true)
  const [elementToScroll, setElementToScroll] = useState(null)
  const elementRef = createRef()

  useEffect(() => {
    // eslint-disable-next-line
    const path = props.location?.pathname
    // Updating the current path in the app state
    props.setCurrentRoute(path)
    // Set element to scroll behavior after content loaded
    setElementToScroll(elementRef.current)
  })

  const handleClickDialogOpen = () => {
    setDialogOpen(true)
  }

  const handleDialogClose = () => {
    setDialogOpen(false)
  }

  const handleClickSnackbarOpen = () => {
    setSnackbarOpen(true)
  }

  const handleSnackbarClose = (event, reason) => {
    // Closing only when you click the close Alert button
    if (reason === 'clickaway') {
      return
    }
    setSnackbarOpen(false)
  }

  const handleAlertClose = () => {
    setCollapseOpen(false)
  }

  return (
    <DarkThemeProvider>
      <div className={classes.root} ref={elementRef}>
        <Container className={classes.container}>
          <Typography variant="h5" gutterBottom className={classes.title}>
            Material UI examples
          </Typography>
          <Typography variant="subtitle1" gutterBottom className={classes.title}>
            Buttons
          </Typography>
          <Grid container spacing={3} className={classes.grid}>
            <Grid item xs={12} className={classes.gridItem}>
              <div className="buttons">
                <Button variant="contained">Default</Button>
                <Button variant="contained" color="primary">
                  Primary
                </Button>
                <Button variant="contained" color="secondary">
                  Secondary
                </Button>
                <Button variant="contained" disabled>
                  Disabled
                </Button>
                <Button variant="contained" color="primary" href="#/material">
                  Link
                </Button>
                <Button variant="outlined">Outlined</Button>
              </div>
              <Divider className="bottom" />
              <Typography variant="caption" display="block" gutterBottom>
                <a
                  href="https://material-ui.com/pt/components/buttons/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://material-ui.com/pt/components/buttons/
                </a>
              </Typography>
            </Grid>
          </Grid>
          <Typography variant="subtitle1" gutterBottom className={classes.title}>
            Dialog
          </Typography>
          <Grid container spacing={3} className={classes.grid}>
            <Grid item xs={12} className={classes.gridItem}>
              <div className="buttons">
                <Button variant="outlined" onClick={handleClickDialogOpen}>
                  Open dialog
                </Button>
              </div>
              <Dialog
                open={dialogOpen}
                TransitionComponent={DialogTransition}
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  Use Google&apos;s location service?
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Let Google help apps determine location. This means
                    sending anonymous location data to Google, even when no apps are running.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleDialogClose}>
                    Disagree
                  </Button>
                  <Button onClick={handleDialogClose} autoFocus>
                    Agree
                  </Button>
                </DialogActions>
              </Dialog>
              <Divider className="bottom" />
              <Typography variant="caption" display="block" gutterBottom>
                <a
                  href="https://material-ui.com/pt/components/dialogs/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://material-ui.com/pt/components/dialogs/
                </a>
              </Typography>
            </Grid>
          </Grid>
          <Typography variant="subtitle1" gutterBottom className={classes.title}>
            Snackbar and Alert
          </Typography>
          <Grid container spacing={3} className={classes.grid}>
            <Grid item xs={12} className={classes.gridItem}>
              <div className="snackbar">
                <Button variant="outlined" onClick={handleClickSnackbarOpen}>
                  Open success snackbar
                </Button>
                <Snackbar
                  open={snackbarOpen}
                  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                  autoHideDuration={6000}
                  TransitionComponent={SlideTransition}
                  key={SlideTransition.name}
                  onClose={handleSnackbarClose}
                >
                  {/* Slide does not work if there is only one custom component.
                  So the inclusion of DIV */}
                  <div>
                    <Alert onClose={handleSnackbarClose} severity="success">
                      This is a success message!
                    </Alert>
                  </div>
                </Snackbar>
                <Collapse in={collapseOpen}>
                  <Alert severity="error" onClose={handleAlertClose}>This is an error message!</Alert>
                </Collapse>
                <Alert severity="warning">This is a warning message!</Alert>
                <Alert severity="info">This is an information message!</Alert>
                <Alert severity="success">This is a success message!</Alert>
                <Alert icon={<AlarmOnIcon fontSize="inherit" />} elevation={0} className="custom-alert">
                  Custom alert (icon, font and background colors)
                </Alert>
              </div>
              <Divider className="bottom" />
              <Typography variant="caption" display="block" gutterBottom>
                <a
                  href="https://material-ui.com/pt/components/snackbars/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://material-ui.com/pt/components/snackbars/
                </a>
              </Typography>
            </Grid>
          </Grid>
          <Typography variant="subtitle1" gutterBottom className={classes.title}>
            Tooltip
          </Typography>
          <Grid container spacing={3} className={classes.grid}>
            <Grid item xs={12} className={classes.gridItem}>
              <div className="tooltips">
                <Tooltip title="Default tooltip" placement="top">
                  <Button>Default</Button>
                </Tooltip>
                <LightTooltip title="Light tooltip" placement="top">
                  <Button>Light</Button>
                </LightTooltip>
                <BootstrapTooltip title="Bootstrap tooltip" placement="top">
                  <Button>Bootstrap</Button>
                </BootstrapTooltip>
                <HtmlTooltip
                  placement="top"
                  title={(
                    <>
                      <Typography color="inherit">Tooltip with HTML</Typography>
                      <em>{'And here\'s'}</em>
                      &nbsp;
                      <b>some</b>
                      &nbsp;
                      <u>amazing content</u>
                      .&nbsp;
                      {'It\'s very engaging. Right?'}
                    </>
                  )}
                >
                  <Button>HTML</Button>
                </HtmlTooltip>
              </div>
              <Divider className="bottom" />
              <Typography variant="caption" display="block" gutterBottom>
                <a
                  href="https://material-ui.com/pt/components/tooltips/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://material-ui.com/pt/components/tooltips/
                </a>
              </Typography>
            </Grid>
          </Grid>
        </Container>
        <Divider />
        <p className={classes.footer}>
          <Button
            variant="outlined"
            component={Link}
            to="/"
            startIcon={<ArrowBackIcon />}
          >
            Back to the home page
          </Button>
        </p>
      </div>
      <ScrollToTop container={elementToScroll} showIn={150} />
    </DarkThemeProvider>
  )
}

/* Property validation */
MaterialPage.propTypes = {
  setCurrentRoute: PropTypes.func.isRequired
}

/* Mapping the Redux state to component properties. Ex.: this.props.teste1 */
/* const mapStateToProps = (state) => {
  const { teste1 } = state.teste1 // reducer teste1
  const { teste2 } = state.teste2 // reducer teste2
  return { teste1, teste2 }
} */

/* Mapping the Redux dispatches to component properties. Ex.: this.props.setTeste1() */
const mapDispatchToProps = (dispatch) => ({
  setCurrentRoute: (value) => ReduxHelpers.setCurrentRoute(dispatch, value)
})

/* Connecting the component to redux */
export default connect(null, mapDispatchToProps)(MaterialPage)
