import React, { Component } from 'react'
import LoginSpotify from '../components/LoginSpotify' 

class LoginSpotifyContainer extends Component {
  constructor () {
    super();
    this.state = {
      username: '',
      password: '',
      authObj: {},
    }
  }
  handleSubmitUser (e) {
    e.preventDefault();
    getAuthObj()
      .then(obj => {
        this.setState({ authObj: obj})
        console.log('authObj ', this.state.authObj);
      })
    this.props.updateUserAuth('test')
  }
  handleUpdateUser (e) {
    this.setState({
      username: e.target.value
    })
  }
  handleUpdatePassword (e) {
    this.setState({
      password: e.target.value
    })
  }
  render () {
    return (
      <LoginSpotify 
        username={this.state.username}
        password={this.state.password}
        onSubmitUser={(event) => this.handleSubmitUser(event)} 
        onUpdateUser={(event) => this.handleUpdateUser(event)} 
        onUpdatePassword={(event) => this.handleUpdatePassword(event)}
        onUpdateUserAuth={this.props.onUpdateUserAuth}
        />
    )
  }
}

export default LoginSpotifyContainer