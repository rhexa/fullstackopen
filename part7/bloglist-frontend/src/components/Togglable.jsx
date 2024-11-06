import { forwardRef, useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Button } from '@mui/material'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    }
  })

  if (props.type === '2') {
    return (
      <div>
        <div style={showWhenVisible} className="togglableContent">
          {props.children}
        </div>
      </div>
    )
  }

  return (
    <Box sx={{ pb: 4 }}>
      <div style={hideWhenVisible}>
        <Button onClick={() => toggleVisibility()}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>{props.children}</div>
    </Box>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

Togglable.displayName = 'Togglable'

export default Togglable
