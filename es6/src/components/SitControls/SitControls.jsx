import './SitControls.less'

import React, { Component, PropTypes } from 'react'


export default class SitControls extends Component {
    static propTypes = {
        hourlyRate: PropTypes.number,
    }

    render() {
        return (
            <form className='SitControls'>
                <span className='SitControls-input'>
                    <input className='SitControls-input-rate' placeholder="Rate" value={this.props.hourlyRate} />
                    <span className='SitControls-input-label'> per hour </span>
                </span>
                <button className='SitControls-start' type='submit'>Sit</button>
            </form>
        )
    }
}
