import './SitLogLayout.less'

import React, { Component, PropTypes } from 'react'


const SitLogLayout = ({title, actions, content}) =>
    <div className='SitLogLayout'>
        <h1 className='SitLogLayout-title'>{title}</h1>
        <div className='SitLogLayout-actions'>{actions}</div>
        <div className='SitLogLayout-content'>{content}</div>
    </div>


// Export this separately to the definition so the function will have a name
export default SitLogLayout