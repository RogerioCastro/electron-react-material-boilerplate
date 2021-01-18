import { combineReducers } from 'redux'

import teste1Reducer from './teste1Reducer'
import teste2Reducer from './teste2Reducer'

const rootReducer = combineReducers({
  teste1: teste1Reducer,
  teste2: teste2Reducer,
})

export default rootReducer
