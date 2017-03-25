import React, { Component } from 'react'
import Main from '../components/Main'
import { getAuthObj, setAccessToken } from '../utils/spotifyHelpers'

class MainContainer extends Component {
    constructor() {
        super();
        this.state = {
            userAuth: {}
        }
        this.handleUpdateUserAuth = this.handleUpdateUserAuth.bind(this)
    }
    
    parseUserAccessToken (obj) {
        return obj.data.headers.Authorization.split(' ')[1]
    }

    handleUpdateUserAuth () {
        getAuthObj()
            .then(obj => {
                this.setState({ userAuth: obj })
                setAccessToken(this.parseUserAccessToken(obj))
                console.debug('handleUpdateUserAuth ', obj);
            })
    }

    render(props) {
        const propsWithChildren = React.Children.map(this.props.children,
            (child) => React.cloneElement(child, { 
                onUpdateUserAuth: this.handleUpdateUserAuth
            })
        )
        return (
        <Main>{propsWithChildren}</Main>
        )
    }
}

export default MainContainer