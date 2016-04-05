import './Modal.less'
import React, { Component, PropTypes } from 'react'


export default class Modal extends Component {
	static propTypes = {
		isOpen: PropTypes.bool,
	    onRequestClose: PropTypes.func.isRequired,
	    title: PropTypes.string.isRequired,
	}

	render() {
		const { title, ...other } = this.props

		return (
			<BaseModal {...other} className='Modal'>
				<Paper zIndex={2} className='Modal-container'>
			  		<div className='Modal-content'>
			  			<div className='Modal-heading'>
			  				<h2>{this.props.title}</h2>
			  				<a onClick={this.props.onRequestClose} className='Modal-close'>&times;</a>
			  			</div>
			  			{this.props.children}
			  		</div>
			  	</Paper>
			</BaseModal>
		)
	}
}
				
