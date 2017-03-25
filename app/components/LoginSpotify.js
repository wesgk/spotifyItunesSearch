import React, { PropTypes } from 'react'
import ReactRouter, { Link } from 'react-router'
var ButtonStyle = {
  margin: '10px',
}

function LoginSpotify (props) {
  return (
    <div>
      <button type='submit' onClick={props.onUpdateUserAuth} style={ButtonStyle}>Update User Auth</button>
    </div>
  )
}

LoginSpotify.propTypes = {
  onSubmitUser: PropTypes.func.isRequired,
  onUpdateUser: PropTypes.func.isRequired,
  onUpdatePassword: PropTypes.func.isRequired,
  onUpdateUserAuth: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export default LoginSpotify