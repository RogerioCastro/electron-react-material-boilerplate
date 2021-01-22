import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ReduxHelpers } from './Helpers'

function useCurrentRoute(props) {
  const dispatch = useDispatch()
  const { pathname } = props.location || null

  useEffect(() => {
    // Updating the current path in the app state
    if (pathname) {
      ReduxHelpers.setCurrentRoute(dispatch, pathname)
    }
  }, [pathname])
}

const test = null

export { useCurrentRoute, test }
