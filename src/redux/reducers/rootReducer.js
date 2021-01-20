import { combineReducers } from 'redux'

import appReducer from './appReducer'
import teste1Reducer from './teste1Reducer'
import teste2Reducer from './teste2Reducer'

const rootReducer = combineReducers({
  app: appReducer,
  teste1: teste1Reducer,
  teste2: teste2Reducer,
})

export default rootReducer
