import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

/**
 * Custom Link component to avoid current route reload.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.to - Route path.
 * @param {string} props.path - Current route path.
 * @param {Element|Element[]} props.children - Component children.
 * @returns {Link} Link component composition.
 */
function RouteLink(props) {
  const { to, path, children } = props
  if (path === to) {
    return <span>{children}</span>
  }
  return <Link to={to}>{children}</Link>
}

/* Property validation */
RouteLink.propTypes = {
  to: PropTypes.string.isRequired,
  path: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.element
  ]).isRequired
}

/* Setting default values for not required properties */
RouteLink.defaultProps = {
  path: null
}

export default RouteLink
