import './SitLogScreen.less'

import React, { Component, PropTypes } from 'react'
import SitLogGrid from '../SitLogGrid/SitLogGrid'
import SitControls from '../SitControls/SitControls'


export default class SitLogScreen extends Component {
    static propTypes = {
        sits: PropTypes.array.isRequired,
    }

    render() {
        return (
            <div className='SitLogScreen'>
                <h1 className='SitLogScreen-title'>SitBit</h1>
                <SitControls {...this.props.controls} />
                <SitLogGrid sits={this.props.sits} />
            </div>
        )
    }
}
