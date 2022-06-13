import React from 'react'
import PauseCircleRoundedIcon from '@mui/icons-material/PauseCircleRounded'
import PlayCircleRoundedIcon from '@mui/icons-material/PlayCircleRounded'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded'

import './Uploading.css'

function Uploading({ visible }) {
  return (
    <div className={visible ? 'uploading visible' : 'uploading'}>
        <div className="left_side">
            <span className="title">my_father.png</span>
            <div className="uploading_progress">
                <div className="uploading_progress_bar"
                    style={{width: '20%'}}
                ></div>
            </div>
        </div>
        <div className="right_side">
            <small><span className="remaining_time">remaining time 30sec</span></small>
            <div className='uploading_icons'>
                <CancelRoundedIcon className="uploading_icon" />
                <PauseCircleRoundedIcon className="uploading_icon" />
                <PlayCircleRoundedIcon className="uploading_icon" />
            </div>
        </div>
    </div>
  )
}

export default Uploading