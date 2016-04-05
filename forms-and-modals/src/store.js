import React from 'react'
import ReactDOM from 'react-dom'

import SitLogScreen from './screens/SitLogScreen'


let state = {}


export const setState = (updates) => {
	state = Object.assign({}, state, updates)

	ReactDOM.render(
	    React.createElement(SitLogScreen, state),
	    document.getElementById('react-app')
	)
}