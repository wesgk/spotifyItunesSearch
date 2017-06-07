import React, { PropTypes } from 'react'
import ReactRouter, { Link } from 'react-router'

const styles = require('../styles')

function LoginSpotify (props) {
  return (
    <div style={styles.space}>
      <p>
         For the Spotify API to work you have to authenticate with Spotify.
      </p>
      <p>
        Check the readme regarding how to authenticate.  Once you authenticate, click the button below to update the auth-token for this app.
      </p>

      <button type='submit' onClick={props.onUpdateUserAuth} style={styles.buttonStyle}>Update User Auth</button>
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