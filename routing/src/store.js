import React from 'react'
import ReactDOM from 'react-dom'

import ApplicationScreen from './screens/ApplicationScreen'


let state = {}


export const setState = (updates) => {
	state = Object.assign({}, state, updates)

	ReactDOM.render(
	    React.createElement(ApplicationScreen, state),
	    document.getElementById('react-app')
	)
}
