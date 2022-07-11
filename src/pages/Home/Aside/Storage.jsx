import React from 'react'
import StorageRoundedIcon from '@mui/icons-material/StorageRounded'

import './Storage.css'

function Storage({ ammout, percent }) {
    return (
        <div className='storage'>
            <div className="storage_header">
                <StorageRoundedIcon className={percent >= 80 ? "storage_header_icon warning" : "storage_header_icon"}  />
                <span className="text">Storage</span>
            </div>
            <div className="storage_body">
                <div className="storage_progress">
                    <div className={percent >= 80 ? "storage_progress_bar warning" : "storage_progress_bar"} style={{width: `${percent}%`}}></div>
                </div>
                <span className="storage_ammount">{ammout}</span>
            </div>
        </div>
    )
}

export default Storage