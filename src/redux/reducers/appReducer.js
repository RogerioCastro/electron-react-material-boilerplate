/**
 * States related to general application functionality
 */
import { SET_APP_CURRENT_ROUTE } from '../actions'

const initialState = {
  currentRoute: '/',
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_APP_CURRENT_ROUTE:
      return { ...state, currentRoute: action.payload }
    default:
      return { ...state }
  }
}
