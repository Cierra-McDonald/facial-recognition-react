import React, { Component } from 'react'
import './ImageLinkForm.css'

export default class ImageLinkForm extends Component {
    render() {
        return (
            <div>
                <p className='f3'>
                    {'This Magic Brain will detect faces in your pictures.  Give it a try!'}
                </p>
                <div className='center'>
                    <div className=' form center pa4 br3 shadow-5'>
                        <input type="text" className='f4 w-70 center'/>
                        <button className='w-30 grow f4 br2 ph3 pv2 dib white bg-dark-pink'>Detect</button>
                    </div>
                </div>
            </div>
        )
    }
}
