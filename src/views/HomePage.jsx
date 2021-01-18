import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import { ElectronHelpers } from '../core/Helpers'
import './HomePage.scss'

import HomeLogo from '../components/HomeLogo'
import ReactLink from '../components/ReactLink'
import WhiteButton from '../components/WhiteButton'

/**
 * Home page component (route).
 */
class HomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'React Electron Material Boilerplate'
    }
  }

  componentDidMount() {
    // eslint-disable-next-line
    const [onMount, path] = [this.props.onMount, this.props.location.pathname]
    // Sending the current path to the parent component
    onMount(path)
  }

  /* Electron dialog example (information) */
  showElectronMessage = () => {
    ElectronHelpers.showDialogMessage({
      type: 'info',
      title: 'Information',
      channel: 'info-teste',
      message: 'Content test!'
    }, (response) => {
      // eslint-disable-next-line no-console
      console.log('Dialog result:', response)
    })
  }

  /* Electron dialog example (error) */
  showElectronError = () => {
    ElectronHelpers.showDialogMessage({
      type: 'error',
      title: 'Error',
      channel: 'error-teste',
      message: 'Error example!'
    })
  }

  render() {
    const { teste1, teste2 } = this.props
    const { title } = this.state
    return (
      <div className="HomePage">
        <header className="HomePage-header">
          <HomeLogo />
          <h2>
            {title}
          </h2>
        </header>
        <div className="HomePage-links">
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="center"
            className="HomePage-buttons"
            spacing={2}
          >
            <Grid item>
              <WhiteButton
                variant="outlined"
                color="primary"
                component={Link}
                to="/redux"
              >
                Redux example
              </WhiteButton>
            </Grid>
            <Grid item>
              <WhiteButton
                variant="outlined"
                color="primary"
                onClick={this.showElectronMessage}
              >
                Electron Dialog
              </WhiteButton>
            </Grid>
            <Grid item>
              <WhiteButton
                variant="outlined"
                color="primary"
                onClick={this.showElectronError}
              >
                Electron Error
              </WhiteButton>
            </Grid>
          </Grid>
          <ReactLink />
        </div>
        <div className="HomePage-store">
          <div>
            &quot;teste1&quot; state value (redux):
            <br />
            <strong>{teste1}</strong>
          </div>
          <div>
            &quot;teste2&quot; state value (redux):
            <br />
            <strong>{teste2}</strong>
          </div>
        </div>
      </div>
    )
  }
}

/* Property validation */
HomePage.propTypes = {
  teste1: PropTypes.string,
  teste2: PropTypes.string,
  onMount: PropTypes.func
}

/* Setting default values for not required properties */
HomePage.defaultProps = {
  teste1: 'default value',
  teste2: 'default value',
  onMount: () => {}
}

/* Mapping the Redux state to component properties. Ex.: this.props.teste1 */
const mapStateToProps = (state) => {
  const { teste1 } = state.teste1 // reducer teste1
  const { teste2 } = state.teste2 // reducer teste2
  return { teste1, teste2 }
}

/* Connecting the component to redux */
export default connect(mapStateToProps)(HomePage)
