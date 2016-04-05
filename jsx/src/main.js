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

var SITS = [
	{
		from: 1459000000,
		to: 1459000300,
		hourlyRate: 10,
		comment: '',
	},
	{
		from: 1459000350,
		to: 1459000800,
		hourlyRate: 10,
		comment: '',
	},
	{
		from: 1459001000,
		to: 1459001900,
		hourlyRate: 10,
		comment: '',
	},
	{
		from: 1459002000,
		to: 1459005600,
		hourlyRate: 10,
		comment: '',
	},
	{
		from: 1459006000,
		to: 1459013600,
		hourlyRate: 10,
		comment: '',
	},
]

var SitLogGridRow = React.createClass({
    propTypes: {
        sit: React.PropTypes.shape({
            from: React.PropTypes.number.isRequired,
            to: React.PropTypes.number.isRequired,
            hourlyRate: React.PropTypes.number.isRequired,
            comment: React.PropTypes.string,
        }).isRequired,
    },

    render: function() {
        var hoursSitting = (this.props.sit.to - this.props.sit.from) / 60 / 60

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
})

var SitLogGrid = React.createClass({
    propTypes: {
        sits: React.PropTypes.array.isRequired,
    },

    render: function() {
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
                        this.props.sits.map(function(sit, i) {
                            return <SitLogGridRow key={i} sit={sit} />
                        })
                    }
                </tbody>
            </table>
        )
    }
})

var SitControls = React.createClass({
    propTypes: {
        hourlyRate: React.PropTypes.number,
    },

    render: function() {
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
})

var SitLogScreen = React.createClass({
    propTypes: {
        sits: React.PropTypes.array.isRequired,
    },

    render: function() {
        return (
            <div className='SitLogScreen'>
                <h1 className='SitLogScreen-title'>SitBit</h1>
                <SitControls {...this.props.controls} />
                <SitLogGrid sits={this.props.sits} />
            </div>
        )
    }
})
  	

ReactDOM.render(
    <SitLogScreen sits={SITS} controls={{hourlyRate: 10.0}} />,
    document.getElementById('react-app')
)