import store from '../store'
import createHistory from 'history/lib/createHashHistory'


const defaultState=[]


export function reducer(state=defaultState, action) {

}


function Navigated(pathname)  {
	return {
		type: 'NAVIGATED',
		payload: pathname,
	}
}


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
		store.dispatch(Navigated(location.pathname.split('/')))
	}
}


export default new Router 