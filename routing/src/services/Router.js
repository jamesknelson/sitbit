import { setState } from '../store'
import createHistory from 'history/lib/createHashHistory'


class Router {
	constructor() {
		this.history = createHistory()
	}

	start() {
		// Listen for changes to the current location. The 
		// listener is called once immediately. 
		this.unlisten = this.history.listen(this.handleRouteChange)
	}

	stop() {
		this.unlisten()
	}

	navigate(pathname) {
		this.history.push({ pathname })
	}

	handleRouteChange(location) {
		setState({
			Location: location.pathname.split('/')
		})
	}
}


export default new Router 