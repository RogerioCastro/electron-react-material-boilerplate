import { SET_TESTE2 } from '../actions'

const initialState = {
  teste2: 'teste2 initial value',
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TESTE2:
      return { ...state, teste2: action.payload }
    default:
      return { ...state }
  }
}
