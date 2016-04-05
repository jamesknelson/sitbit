import React, { Component, PropTypes } from 'react'
import { setState } from '../store'
import router from '../services/Router'
import SitLogLayout from '../components/SitLogLayout/SitLogLayout'
import SitControls from '../components/SitControls/SitControls'
import SitLogGrid from '../components/SitLogGrid/SitLogGrid'
import Modal from '../components/Modal/Modal'
import SitEditScreen from './SitEditScreen'


export function reducer() {
    
}


export default class SitLogScreen extends Component {
    static propTypes = {
        Data: PropTypes.shape({
            sits: PropTypes.array.isRequired,
        }),
        Screens: PropTypes.shape({
            SitLogScreen: PropTypes.shape({
                hourlyRate: PropTypes.number.isRequired,
            })
        }),
        Location: PropTypes.array,
    }

    handleRateChange = (hourlyRate) => {
    	setState({ 
            Screens: {
                ...this.props.Screens,
                SitLogScreen: { hourlyRate }
            }
        })
    }

    handleRequestToggle = () => {
        const { sits } = this.props.Data
        const { hourlyRate } = this.props.Screens.SitLogScreen 

        if (!sits[0].to) {
            // We have an incomplete sit
            setState({
                Data: {
                    ...this.props.Data,
                    sits: [{
                        from: sits[0].from,
                        to: new Date().getTime() / 1000,
                        hourlyRate: hourlyRate,
                    }].concat(sits.slice(1))
                }
            })
        }
        else {
            // We have no incomplete sit
            setState({
                Data: {
                    ...this.props.Data,
                    sits: [{
                        from: new Date().getTime() / 1000,
                        hourlyRate,
                    }].concat(sits)
                }
            })
        }
    }

    handleRequestClose = () => router.navigate('/')
    handleSelectRow = (row, i) => router.navigate('/logs/'+i)

    render() {
        const isEditing = this.props.Location && this.props.Location.length > 1
        const modalContent = isEditing && <SitEditScreen {...this.props} Location={this.props.Location.slice(1)} />

        const { sits } = this.props.Data
        const { hourlyRate } = this.props.Screens.SitLogScreen 

        return (
            <div>
                <SitLogLayout
    		        title="SitBit"
    		        actions={
    		        	<SitControls
    		        		active={!sits[0].to}
                            hourlyRate={hourlyRate}
    		        		onChangeRate={this.handleRateChange}
    		        		onRequestToggle={this.handleRequestToggle}
    		        	/>
    		        }
    		        content={
    		        	<SitLogGrid
                            sits={sits}
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