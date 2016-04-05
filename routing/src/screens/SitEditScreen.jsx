import React, { Component, PropTypes } from 'react'
import { setState } from '../store'
import router from '../services/Router'
import SitForm from '../components/SitForm/SitForm'


export default class SitEditScreen extends Component {
    static propTypes = {
        Data: PropTypes.shape({
            sits: PropTypes.array.isRequired,
        }),
        Screens: PropTypes.shape({
            SitEditScreen: PropTypes.object,
        }),
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
            console.log(nextProps.Location[0])
            this.handleChange(nextProps.Data.sits[parseInt(nextProps.Location[0])])
        }
    }


    setSitsAndNavigate(sits) {
        setState({
            Data: { ...this.props.Data, sits },
        })

        router.navigate('/')
    }


    handleChange = (value) => {
        setState({
            Screens: {
                ...this.props.Screens,
                SitEditScreen: value,
            }
        })
    }

    handleRequestSubmit = () => {
        const newSits = this.props.Data.sits.slice(0)
        newSits[this.props.Location[0]] = this.props.Screens.SitEditScreen
        this.setSitsAndNavigate(newSits)
    }

    handleRequestDelete = () => {
        const newSits = this.props.Data.sits.slice(0)
        newSits.splice(this.props.Location[0], 1)
        this.setSitsAndNavigate(newSits)
    }

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