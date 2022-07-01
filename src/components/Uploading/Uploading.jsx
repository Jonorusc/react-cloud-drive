import React from 'react'

import './Uploading.css'

function Uploading({ title, remaining, percent }) {
  return (
    <div className="uploading visible">
        <div className="left_side">
            <span className="title">{title}</span>
            <div className="uploading_progress">
                <div className="uploading_progress_bar"
                    style={{width: `${percent}%'`}}
                >{percent}%</div>
            </div>
        </div>
        <div className="right_side">
            <small><span className="remaining_time">{remaining}</span></small>
            
        </div>
    </div>
  )
}

export default Uploading