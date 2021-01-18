import { SET_TESTE1 } from '../actions'

const initialState = {
  teste1: 'teste1 initial value',
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TESTE1:
      return { ...state, teste1: action.payload }
    default:
      return { ...state }
  }
}
