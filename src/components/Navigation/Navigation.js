import React, { Component } from 'react'



export default class Navigation extends Component {
    render() {
        return (
            <nav style={{display: 'flex', justifyContent: 'flex-end', paddingRight: '20px'}}>
              <p className='f3 link dim black underline pa3 pointer'>Sign Out</p>
            </nav>
        )
    }
}
