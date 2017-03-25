import React, { Component } from 'react'
import HomePage from '../components/HomePage'

class HomePageContainer extends Component {

    constructor () {
        super();
        this.state = {
            fname: '',
            lname: '',
            email: '',
        }
    }
    
    render() {
        return (
            <div>
                Homepage / Callback
            </div>
        )
    }
}

export default HomePageContainer