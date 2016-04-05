import React, { Component, PropTypes } from 'react'
import { setState } from '../store'
import { Update as UpdateSit, Delete as DeleteSit } from '../data/Sits'
import router from '../services/Router'
import SitForm from '../components/SitForm/SitForm'


const defaultState=[]


function reducer(state=defaultState, action) {

}



@connect(
    state => ({
        Sits: state.Data.Sits,
        Screen: state.Screens.SitEditScreen,
    }),
    {
        update: UpdateSit,
        delete: DeleteSit,
    }
)
export default class SitEditScreen extends Component {
    static propTypes = {
        Sits: PropTypes.array.isRequired
        Screen: PropTypes.object,
        Location: PropTypes.array,
    }

    componentWillMount() {
        this.handleNavigate({Location: []}, this.props)
    }
    componentWillReceiveProps(nextProps) {
        this.handleNavigate(this.props, nextProps)
    }

    handleNavigate(prevProps, nextProps) {
        if (nextProps.Location[0] != prevProps.Location[0]) {
            this.handleChange(nextProps.sits[parseInt(nextProps.Location[0])])
        }
    }

    handleChange = (value) => {
        setState({
            Screens: {
                ...this.props.Screens,
                SitEditScreen: value,
            }
        })
    }

    handleRequestSubmit = () => this.props.update(this.props.Location[0], this.props.Screen)
    handleRequestDelete = () => this.props.delete(this.props.Location[0])

    render() {
        if (this.props.Screens.SitEditScreen) {
            return (
                <SitForm 
                    value={this.props.Screens.SitEditScreen}
                    onChange={this.handleChange}
                    onRequestSubmit={this.handleRequestSubmit}
                    onRequestDelete={this.handleRequestDelete}
                />
            )
        }
        else {
            return <div />
        }
    }
}