import React, { Component, PropTypes } from 'react'
import { setState } from '../store'
import SitForm from '../components/SitForm/SitForm'


export default class SitEditScreen extends Component {
    static propTypes = {
        editing: PropTypes.object.isRequired,
        sits: PropTypes.array.isRequired,
    }

    handleChange = (value) => {
        setState({
            editing: value,
        })
    }

    handleRequestSubmit = () => {
        const newSits = this.props.sits.slice(0)
        newSits[this.props.editing.id] = this.props.editing

        setState({
            sits: newSits,
            editing: null,
        })
    }

    handleRequestDelete = () => {
        const newSits = this.props.sits.slice(0)
        newSits.splice(this.props.editing.id, 1)

        setState({
            sits: newSits,
            editing: null,
        })
    }

    render() {
        return (
            <SitForm 
                value={this.props.editing}
                onChange={this.handleChange}
                onRequestSubmit={this.handleRequestSubmit}
                onRequestDelete={this.handleRequestDelete}
            />
        )
    }
}