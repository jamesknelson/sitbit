import './SitLogGrid.less'

import React, { Component, PropTypes } from 'react'
import numeral from 'numeral'
import moment from 'moment'


function formatDate(time) {
    return moment(time*1000).format('YYYY-MM-DD')
}
function formatTime(time) {
    return moment(time*1000).format('HH:mm')
}
function formatDuration(hours) {
    return (
        hours > 1
            ? (numeral(hours).format('0.00') + ' hours')
            : (numeral(hours * 60).format('0') + ' minutes')
    )
}


class SitLogGridRow extends Component {
    static propTypes = {
        sit: PropTypes.shape({
            from: React.PropTypes.number.isRequired,
            to: React.PropTypes.number.isRequired,
            hourlyRate: React.PropTypes.number.isRequired,
            comment: React.PropTypes.string,
        }).isRequired,
    }

    render() {
        const hoursSitting = (this.props.sit.to - this.props.sit.from) / 60 / 60

        return (
            <tr className='SitLogGridRow'>
                <td className='SitLogGridRow-cell'>{formatDate(this.props.sit.from)}</td>
                <td className='SitLogGridRow-cell'>{formatTime(this.props.sit.from)}</td>
                <td className='SitLogGridRow-cell'>{formatTime(this.props.sit.to)}</td>
                <td className='SitLogGridRow-cell'>{formatDuration(hoursSitting)}</td>
                <td className='SitLogGridRow-cell SitLogGridRow-price'>{numeral(this.props.sit.hourlyRate).format('$0,0.00')}</td>
                <td className='SitLogGridRow-cell SitLogGridRow-price'>{numeral(this.props.sit.hourlyRate * hoursSitting).format('$0,0.00')}</td>
                <td className='SitLogGridRow-cell'>{this.props.sit.note}</td>
            </tr>
        )
    }
}



export default class SitLogGrid extends Component {
    static propTypes = {
        sits: PropTypes.array.isRequired,
    }

    render() {
        return (
            <table className='SitLogGrid'>
                <thead>
                    <tr> 
                        <th className='SitLogGrid-heading'>Date</th>
                        <th className='SitLogGrid-heading'>Start</th>
                        <th className='SitLogGrid-heading'>End</th>
                        <th className='SitLogGrid-heading'>Duration</th>
                        <th className='SitLogGrid-heading'>Hourly Rate</th>
                        <th className='SitLogGrid-heading'>Cost</th>
                        <th className='SitLogGrid-heading'>Comment</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.sits.map((sit, i) =>
                            <SitLogGridRow key={i} sit={sit} />
                        )
                    }
                </tbody>
            </table>
        )
    }
}