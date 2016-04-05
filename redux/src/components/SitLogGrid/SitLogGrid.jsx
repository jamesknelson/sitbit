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
            to: React.PropTypes.number,
            hourlyRate: React.PropTypes.number.isRequired,
            comment: React.PropTypes.string,
            onClick: React.PropTypes.func,
        }).isRequired,
    }

    render() {
        const to = this.props.sit.to || (new Date().getTime() / 1000)
        const hoursSitting = (to - this.props.sit.from) / 60 / 60
        const active = !this.props.sit.to
        
        const classes = ['SitLogGridRow']
        if (active) classes.push('SitLogGridRow-active')
        if (this.props.onClick) classes.push('SitLogGridRow-clickable')

        return (
            <tr className={classes.join(' ')} onClick={this.props.onClick}>
                <td className='SitLogGridRow-cell'>{formatDate(this.props.sit.from)}</td>
                <td className='SitLogGridRow-cell'>{formatTime(this.props.sit.from)}</td>
                <td className='SitLogGridRow-cell'>{formatTime(to)}</td>
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
        onSelectRow: PropTypes.func,
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
                            /* Assumes that someone cannot sit, stand up and then sit down again in a time of < 2 miliseconds. */
                            <SitLogGridRow
                                key={sit.from}
                                sit={sit}
                                onClick={this.props.onSelectRow && this.props.onSelectRow.bind(null, sit, i)}
                            />
                        )
                    }
                </tbody>
            </table>
        )
    }
}