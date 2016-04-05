import { createStore, combineReducers } from 'redux'

import { reducer as SitEditScreen } from './screens/SitEditScreen'
import { reducer as SitLogScreen } from './screens/SitLogScreen'
import { reducer as Sits } from './data/Sits'
import { reducer as Location } from './services/Router'


const rootReducer = combineReducers({
	Data: combineReducers({
		Sits,
	}),
	Screens: combineReducers({
		SitEditScreen,
		SitLogScreen,
	}),
	Location,
})


export default createStore(rootReducer)
