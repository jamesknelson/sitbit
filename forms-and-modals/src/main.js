import { setState } from './store'
import IntervalRenderer from './services/IntervalRenderer'

// Set the initial application state and render immediately
setState({
	sits: [
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
	],

	hourlyRate: 10,

	editing: null,
})

// Re-render the application once per second
const intervalRenderer = new IntervalRenderer
intervalRenderer.start()