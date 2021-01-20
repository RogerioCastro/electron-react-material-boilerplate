import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'

import WhiteButton from '../WhiteButton'

function HomeButtons(props) {
  const { buttons, gridClassName } = props
  return (
    <Grid
      container
      direction="row"
      justify="space-around"
      alignItems="center"
      className={gridClassName}
      spacing={2}
    >
      {buttons.map((button) => {
        const buttonProps = button.to ? { component: Link } : {}
        return (
          <Grid key={button.label} item>
            <WhiteButton
              variant="outlined"
              color="primary"
              {...buttonProps}
              {...button}
            >
              {button.label}
            </WhiteButton>
          </Grid>
        )
      })}
    </Grid>
  )
}

/* Property validation */
HomeButtons.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({})
  ])).isRequired,
  gridClassName: PropTypes.string
}

/* Setting default values for not required properties */
HomeButtons.defaultProps = {
  gridClassName: null
}

export default HomeButtons
