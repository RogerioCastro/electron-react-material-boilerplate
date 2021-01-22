import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ElectronHelpers } from '../core/Helpers'
import version from '../assets/version.svg'
import './HomePage.scss'

import { useCurrentRoute } from '../core/Hooks'
import HomeLogo from '../components/HomeLogo'
import ReactLink from '../components/ReactLink'
import HomeButtons from '../components/HomeButtons'

/**
 * Home page component (route).
 */
function HomePage(props) {
  const { teste1, teste2 } = props
  const title = 'React Electron Material Boilerplate'

  useCurrentRoute(props)

  /* Electron dialog example (information) */
  function showElectronMessage() {
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
  function showElectronError() {
    ElectronHelpers.showDialogMessage({
      type: 'error',
      title: 'Error',
      channel: 'error-teste',
      message: 'Error example!'
    })
  }

  // Buttons (actions and routes)
  const homeButtons = [
    {
      label: 'Electron Dialog',
      onClick: showElectronMessage
    },
    {
      label: 'Electron Error',
      onClick: showElectronError
    },
    {
      label: 'Redux',
      to: '/redux'
    },
    {
      label: 'Material UI',
      to: '/material'
    }
  ]

  return (
    <div className="HomePage">
      <header className="HomePage-header">
        <HomeLogo />
        <h2>
          {title}
        </h2>
        <div className="HomeVersion">
          <img src={version} alt="Version" />
        </div>
      </header>
      <div className="HomePage-links">
        <HomeButtons buttons={homeButtons} gridClassName="HomePage-buttons" />
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

/* Property validation */
HomePage.propTypes = {
  teste1: PropTypes.string,
  teste2: PropTypes.string
}

/* Setting default values for not required properties */
HomePage.defaultProps = {
  teste1: 'default value',
  teste2: 'default value'
}

/* Mapping the Redux state to component properties. Ex.: props.teste1 */
const mapStateToProps = (state) => {
  const { teste1 } = state.teste1 // reducer teste1
  const { teste2 } = state.teste2 // reducer teste2
  return { teste1, teste2 }
}

/* Connecting the component to redux */
export default connect(mapStateToProps)(HomePage)
