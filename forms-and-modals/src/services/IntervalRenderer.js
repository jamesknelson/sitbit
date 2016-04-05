import { setState } from '../store'


export default class IntervalRenderer {
	start() {
		this.interval = setInterval(this.render, 1000)
	}

	stop() {
		if (this.interval) {
			clearInterval(this.interval)
			this.interval = null
		}
	}

	render = () => {
		setState({})
	}
}