import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { TextField, Divider, Button } from '@material-ui/core'
import { ArrowBack as ArrowBackIcon, Edit as EditIcon } from '@material-ui/icons'
import { ReduxHelpers } from '../core/Helpers'
import './ReduxPage.scss'

/* Reusing a theme provider, when it cannot be used in the App */
import DarkThemeProvider from '../components/DarkThemeProvider'

/**
 * Redux example page component (route).
 */
function ReduxPage(props) {
  // Get properties
  const { teste1, teste2 } = props

  useEffect(() => {
    // eslint-disable-next-line
    const path = props.location?.pathname
    // Updating the current path in the app state
    props.setCurrentRoute(path)
  })

  // Handling state change
  function handleChangeTeste1(e) {
    props.setTeste1(e.target.value)
  }

  // Handling state change
  function handleChangeTeste2(e) {
    props.setTeste2(e.target.value)
  }

  return (
    <DarkThemeProvider className="ReduxPage">
      <h2>
        Redux
      </h2>
      <Divider />
      <div>
        teste1 value:&nbsp;
        <strong>{teste1}</strong>
        <div className="ReduxPage-input">
          <TextField
            id="inputTeste1"
            value={teste1}
            onChange={handleChangeTeste1}
            label="Change the value"
            color="primary"
            InputProps={{
              endAdornment: <EditIcon fontSize="small" />
            }}
            fullWidth
          />
        </div>
      </div>
      <Divider />
      <div>
        teste2 value:&nbsp;
        <strong>{teste2}</strong>
        <div className="ReduxPage-input">
          <TextField
            id="inputTeste2"
            label="Change the value"
            value={teste2}
            onChange={handleChangeTeste2}
            color="primary"
            InputProps={{
              endAdornment: <EditIcon fontSize="small" />
            }}
            fullWidth
          />
        </div>
      </div>
      <Divider />
      <p>
        <Button
          variant="outlined"
          component={Link}
          to="/"
          startIcon={<ArrowBackIcon />}
        >
          Back to the home page
        </Button>
      </p>
    </DarkThemeProvider>
  )
}

/* Property validation */
ReduxPage.propTypes = {
  teste1: PropTypes.string,
  teste2: PropTypes.string,
  setCurrentRoute: PropTypes.func.isRequired,
  setTeste1: PropTypes.func.isRequired,
  setTeste2: PropTypes.func.isRequired
}

/* Setting default values for not required properties */
ReduxPage.defaultProps = {
  teste1: 'default value',
  teste2: 'default value'
}

/* Mapping the Redux state to component properties. Ex.: this.props.teste1 */
const mapStateToProps = (state) => {
  const { teste1 } = state.teste1 // reducer teste1
  const { teste2 } = state.teste2 // reducer teste2
  return { teste1, teste2 }
}

/* Mapping the Redux dispatches to component properties. Ex.: this.props.setTeste1() */
const mapDispatchToProps = (dispatch) => ({
  setCurrentRoute: (value) => ReduxHelpers.setCurrentRoute(dispatch, value),
  setTeste1: (value) => ReduxHelpers.setTeste1(dispatch, value),
  setTeste2: (value) => ReduxHelpers.setTeste2(dispatch, value)
})

/* Connecting the component to redux */
export default connect(mapStateToProps, mapDispatchToProps)(ReduxPage)
