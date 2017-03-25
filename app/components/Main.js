import React, { PropTypes} from 'react'
import ReactRouter, { Link } from 'react-router'
import { generateRandomString, loginLink } from '../utils/spotifyHelpers'

var styles = require('../styles');

function Main (props) {
  return (
    <div className="container jumbotron col-sm-12 text-center" style={styles.transparentBg}>
      <nav>
        <Link to='/search' style={styles.space}>Search</Link>
        <Link to='/login' style={styles.space}>Login</Link>
      </nav>
      <div>
        {props.children}
      </div>
    </div>
  )
}

Main.propTypes = {
  updateUserAuth: PropTypes.func
}

export default Main