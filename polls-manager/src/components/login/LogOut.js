import React, { Component } from 'react'
import { Link } from 'react-router-dom'

 class Logout extends Component {
     
    render() {
        return (
            <div>
                <h1>
                    you are now logged out!!
                </h1>
                <Link to="/Home">Login again</Link>
                
            </div>
        )
    }
}

export default Logout
