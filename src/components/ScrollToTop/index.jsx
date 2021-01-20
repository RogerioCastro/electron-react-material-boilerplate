import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Fab, Zoom, Tooltip } from '@material-ui/core'
import UpIcon from '@material-ui/icons/KeyboardArrowUp'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(1),
    right: theme.spacing(3),
    color: '#ffffff',
    backgroundColor: '#605971b8',
    '&:hover': {
      color: '#000000'
    }
  }
}))

/**
 * Show "go to the top" buttom
 *
 * @param {Object} props - Component properties.
 * @param {HTMLElement} props.container - HTML element with scroll behavior.
 * If not, set to 'window'.
 * @param {Number} props.showIn - Position, in pixels, at which
 * the button will start displaying.
 * @returns {ScrollToTop} Component.
 */
function ScrollToTop(props) {
  const classes = useStyles()
  const { container, showIn } = props
  const [hasScroll, setHasScroll] = useState(false)
  const [scrollTop, setScrollTop] = useState(0)

  function handleSetScrollTopWindow() {
    setScrollTop(container.document.documentElement.scrollTop)
  }

  useEffect(() => {
    // Checking if the container is already loaded and has a scroll bar
    if (container) {
      const scrollHeight = container === window
        ? container.document.documentElement.scrollHeight
        : container.scrollHeight
      const clientHeight = container === window
        ? container.document.documentElement.clientHeight
        : container.clientHeight
      // has a scroll bar
      if (scrollHeight > clientHeight) {
        setHasScroll(scrollHeight > clientHeight)
        // Listening to the element's scroll event
        if (container === window) {
          window.addEventListener('scroll', handleSetScrollTopWindow)
        } else {
          container.onscroll = () => {
            setScrollTop(container.scrollTop)
          }
        }
      }
    }
    return () => {
      if (container === window) {
        window.removeEventListener('scroll', handleSetScrollTopWindow)
      }
    }
  }, [container])

  const scrollToTop = () => {
    container.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!hasScroll) {
    return <></>
  }

  return (
    <Zoom in={scrollTop >= showIn}>
      <Tooltip arrow title="Go to the top" placement="left">
        <Fab aria-label="top" className={classes.root} size="small" onClick={scrollToTop}>
          <UpIcon />
        </Fab>
      </Tooltip>
    </Zoom>
  )
}

/* Property validation */
ScrollToTop.propTypes = {
  container: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({})
  ]),
  showIn: PropTypes.number
}

/* Setting default values for not required properties */
ScrollToTop.defaultProps = {
  container: null,
  showIn: 0
}

export default ScrollToTop
