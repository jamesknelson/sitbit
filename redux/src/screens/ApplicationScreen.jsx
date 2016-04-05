import React, { Component, PropTypes } from 'react'
import { setState } from '../store'
import SitLogScreen from './SitLogScreen'


export default class ApplicationScreen extends Component {
    static propTypes = {
        Location: PropTypes.array,
    }

    render() {
        const [location, ...subLocation] = this.props.Location || []

        switch (location) {
            case undefined:
            case '':
            case 'logs':
                return <SitLogScreen {...this.props} Location={subLocation} />

            default: 
                console.error('Unknown Route.')
        }
    }
}
