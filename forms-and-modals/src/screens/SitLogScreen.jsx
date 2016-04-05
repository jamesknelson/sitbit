import React, { Component, PropTypes } from 'react'
import { setState } from '../store'
import SitLogLayout from '../components/SitLogLayout/SitLogLayout'
import SitControls from '../components/SitControls/SitControls'
import SitLogGrid from '../components/SitLogGrid/SitLogGrid'
import Modal from '../components/Modal/Modal'
import SitEditScreen from './SitEditScreen'


export default class SitLogScreen extends Component {
    static propTypes = {
        sits: PropTypes.array.isRequired,
        hourlyRate: PropTypes.number.isRequired,
        editing: PropTypes.object,
    }

    handleRateChange = (hourlyRate) => {
    	setState({ hourlyRate })
    }

    handleRequestToggle = () => {
        if (!this.props.sits[0].to) {
            // We have an incomplete sit
            setState({
                sits: [{
                    from: this.props.sits[0].from,
                    to: new Date().getTime() / 1000,
                    hourlyRate: this.props.hourlyRate,
                }].concat(this.props.sits.slice(1))
            })
        }
        else {
            // We have no incomplete sit
            setState({
                sits: [{
                    from: new Date().getTime() / 1000,
                    hourlyRate: this.props.hourlyRate,
                }].concat(this.props.sits)
            })
        }
    }

    handleRequestClose = () => {
        setState({
            editing: null,
        })
    }

    handleSelectRow = (row, i) => {
        setState({
            editing: {
                id: i,
                ...row,
            },
        })
    }

    render() {
        const modalContent = this.props.editing &&
            <SitEditScreen {...this.props} />

        return (
            <div>
                <SitLogLayout
    		        title="SitBit"
    		        actions={
    		        	<SitControls
    		        		active={!this.props.sits[0].to}
                            hourlyRate={this.props.hourlyRate}
    		        		onChangeRate={this.handleRateChange}
    		        		onRequestToggle={this.handleRequestToggle}
    		        	/>
    		        }
    		        content={
    		        	<SitLogGrid
                            sits={this.props.sits}
                            onSelectRow={this.handleSelectRow}
                        />
    		        }
    		    />
                <Modal
                    isOpen={!!modalContent}
                    onRequestClose={this.handleRequestClose}
                    title='Edit Log Entry'
                  >
                    {modalContent}
                </Modal>
            </div>
        )
    }
}