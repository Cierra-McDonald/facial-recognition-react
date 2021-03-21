import React, { Component } from 'react'

export default class Rank extends Component {
    render() {
        return (
            <div>
                <div className='white f3'>
                    {`Hey ${this.props.name}, your current entry is ...`}
                </div>
                <div className='white f1'>
                    {`${this.props.entries}`}
                </div>
            </div>
        )
    }
}
