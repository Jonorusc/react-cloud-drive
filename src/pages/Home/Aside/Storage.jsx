import React from 'react'
import StorageRoundedIcon from '@mui/icons-material/StorageRounded'

import './Storage.css'

function Storage( {ammout} ) {
    return (
        <div className='storage'>
            <div className="storage_header">
                <StorageRoundedIcon />
                <span className="text">Storage</span>
            </div>
            <div className="storage_body">
                <div className="storage_progress">
                    <div className="storage_progress_bar" style={{width: '10.3%'}}></div>
                </div>
                <span className="storage_ammount">{ammout}</span>
            </div>
        </div>
    )
}

export default Storage