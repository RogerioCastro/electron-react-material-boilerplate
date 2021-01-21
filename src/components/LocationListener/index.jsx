import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { ReduxHelpers } from '../../core/Helpers'

function LocationListener(props) {
  const dispatch = useDispatch()
  const { children } = props
  const { pathname } = props.location

  useEffect(() => {
    // Updating the current path in the app state
    if (pathname) {
      ReduxHelpers.setCurrentRoute(dispatch, pathname)
    }
  }, [pathname])

  return children
}

LocationListener.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.element
  ]).isRequired
}

export default LocationListener
