import React from 'react'
import ReactDOM from 'react-dom'

import SitLogScreen from './components/SitLogScreen/SitLogScreen'


const SITS = [
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


ReactDOM.render(
    React.createElement(SitLogScreen, {sits: SITS, controls: {hourlyRate: 10.0}}),
    document.getElementById('react-app')
)