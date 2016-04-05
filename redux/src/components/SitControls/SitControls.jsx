import './SitControls.less'

import React, { Component, PropTypes } from 'react'
import Icon from 'react-fa'


export default class SitControls extends Component {
    static propTypes = {
        active: PropTypes.bool,
        hourlyRate: PropTypes.number,
        onRequestToggle: PropTypes.func.isRequired,
        onChangeRate: PropTypes.func.isRequired,
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.onRequestToggle()
    }

    handleRateChange = (e) => {
        const number = parseFloat(e.target.value)
        this.props.onChangeRate(Number.isNaN(number) ? '' : number)
    }

    render() {
        const classes = 'SitControls ' + (this.props.active ? ' SitControls-active' : '')

        return (
            <form className={classes} onSubmit={this.handleSubmit}>
                <span className='SitControls-input'>
                    <input
                        className='SitControls-input-rate'
                        disabled={this.props.active}
                        placeholder="Rate"
                        value={this.props.hourlyRate}
                        onChange={this.handleRateChange}
                    />
                    <span className='SitControls-input-label'> per hour </span>
                </span>
                <button className='SitControls-toggle' type='submit'>
                    {
                        this.props.active
                            ? <span><Icon spin name='stop-circle-o' />Stop sitting</span>
                            : <span><Icon name='play' />Sit</span>
                    }
                </button>
            </form>
        )
    }
}
