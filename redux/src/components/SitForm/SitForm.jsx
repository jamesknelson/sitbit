import './SitForm.less'
import React, { Component, PropTypes } from 'react'


export default class SitForm extends Component {
    static propTypes = {
        // The note object to display within the form
        value:
            PropTypes.shape({
                note: PropTypes.string,
                hourlyRate: PropTypes.number,
            }).isRequired,

        // Emits new note objects for each change
        onChange: PropTypes.func.isRequired,

        // Called when the user wants to submit the form
        onRequestSubmit: PropTypes.func.isRequired,

        // Called when the user wants to delete the associated object
        onRequestDelete: PropTypes.func.isRequired,
    }

    componentDidMount() {
        setTimeout(() => this.refs.hourlyRate.focus())
    }

    handleChangeNote = (e) => {
        this.props.onChange({
            ...this.props.value,
            note: e.target.value,
        })
    }

    handleChangeHourlyRate = (e) => {
        this.props.onChange({
            ...this.props.value,
            hourlyRate: e.target.value ? parseFloat(e.target.value) : null,
        })
    }

    handleRequestSubmit = (e) => {
        e.preventDefault()
        this.props.onRequestSubmit()
    }

    render() {
        const { hourlyRate, note } = this.props.value

        return (
            <form onSubmit={this.handleRequestSubmit}>
                <fieldset className='SitForm-fields'>
                    <label className='SitForm-label'>
                        Hourly Rate
                        <input
                            type='number'
                            value={hourlyRate}
                            onChange={this.handleChangeHourlyRate}
                            ref='hourlyRate'
                            className='SitForm-input'
                        />
                    </label>
                    <label className='SitForm-label'>
                        Comment
                        <textarea
                            value={note || ''}
                            onChange={this.handleChangeNote}
                            className='SitForm-input'
                        />
                    </label>
                </fieldset>
                <div className='SitForm-actions'>
                    <button
                        type='button'
                        tabIndex={-1}
                        onClick={this.props.onRequestDelete}
                        className='SitForm-actions-delete'
                    >
                        Delete
                    </button>
                    <button
                        type='submit'
                        onClick={this.handleRequestSubmit}
                        className='SitForm-actions-submit'
                    >
                        Save
                    </button>
                </div>
            </form>
        )
    }
}