import React, { Component } from 'react'

export default class FaceRecognition extends Component {
    render() {
        return (
            <div>
               <div className="center ma">
                   <div className='absolute mt2'>
                        <img src={this.props.imageUrl} alt='' width='500px' height='auto'/>
                   </div>
                </div> 
            </div>
        )
    }
}
