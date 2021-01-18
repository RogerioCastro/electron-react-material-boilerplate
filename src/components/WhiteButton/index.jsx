import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

/**
 * Custom white button.
 *
 * @returns {Button} Custom styled Button.
 */
const WhiteButton = withStyles(() => ({
  root: {
    color: '#FFFFFF',
    borderColor: '#FFFFFF',
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.1)',
      borderColor: '#FFFFFF'
    },
  }
}))(Button)

export default WhiteButton
