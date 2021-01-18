import React from 'react'
import PropTypes from 'prop-types'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
// import CssBaseline from '@material-ui/core/CssBaseline'

/* Create new theme */
const darkTheme = createMuiTheme({
  palette: {
    type: 'dark'
  }
})

/**
 * Custom theme provider for dark palette.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.className - CSS class name for children container element.
 * @param {Element|Element[]} props.children - Component children.
 * @returns {ThemeProvider} ThemeProvider component composition.
 */
function DarkThemeProvider(props) {
  const { children, className } = props
  return (
    <ThemeProvider theme={darkTheme}>
      {/* <CssBaseline /> */}
      <div className={className}>
        {children}
      </div>
    </ThemeProvider>
  )
}

/* Property validation */
DarkThemeProvider.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.element
  ]).isRequired
}

/* Setting default values for not required properties */
DarkThemeProvider.defaultProps = {
  className: null
}

export default DarkThemeProvider
