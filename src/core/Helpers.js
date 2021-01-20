import {
  SET_APP_CURRENT_ROUTE,
  SET_TESTE1,
  SET_TESTE2
} from '../redux/actions'

/* Redux tools */
const ReduxHelpers = {
  setCurrentRoute: (dispatch, value) => dispatch({
    type: SET_APP_CURRENT_ROUTE,
    payload: value
  }),

  setTeste1: (dispatch, value) => dispatch({
    type: SET_TESTE1,
    payload: value
  }),

  setTeste2: (dispatch, value) => dispatch({
    type: SET_TESTE2,
    payload: value
  })
}

/* Electron Communication */
// eslint-disable-next-line
const ElectronHelpers = (function () {
  const electron = window.require('electron')
  const { ipcRenderer } = electron
  const showDialogMessage = ({
    type,
    title,
    channel,
    message,
    buttons
  }, fn) => {
    ipcRenderer.send('dialog-message', {
      type,
      title,
      channel,
      message,
      buttons
    })
    // callback function for click dialog result
    if (fn) {
      ipcRenderer.once(channel, (event, args) => fn(args))
    }
  }
  return {
    showDialogMessage
  }
}())

export { ReduxHelpers, ElectronHelpers }
