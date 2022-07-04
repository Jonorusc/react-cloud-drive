import React from 'react'
import PauseCircleRoundedIcon from '@mui/icons-material/PauseCircleRounded'
import PlayCircleRoundedIcon from '@mui/icons-material/PlayCircleRounded'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded'

import './Uploading.css'

function Uploading({ relative, title, remaining, percent, uploadingStatus, setUploadingStatus, i }) {
    return (
    <div className={relative ? 'uploading active visible': 'uploading visible'}>
        <div className="left_side">
            <span className="title">{title}</span>
            <div className="uploading_progress">
                <div className="uploading_progress_bar"
                    style={{width: `${percent}%`}}
                >{percent}%</div>
            </div>
        </div>
        <div className="right_side">
            <small><span className="remaining_time">{(uploadingStatus.payload === 'pause' && uploadingStatus.index === i) ? 'paused' : remaining}</span></small>
            <div className='uploading_icons'>
            <>
                <div
                    onClick={() => {setUploadingStatus({index: i, payload: 'cancel'})}}
                >
                    <CancelRoundedIcon className="uploading_icon" />
                </div>
                {uploadingStatus.payload !== 'pause' && (
                    <div 
                        onClick={() => {setUploadingStatus({index: i, payload: 'pause'})}}
                    >
                        <PauseCircleRoundedIcon className="uploading_icon" />
                    </div>
                )}
                {uploadingStatus.payload === 'pause'  && (
                    <div
                        onClick={() => {setUploadingStatus({index: i, payload: 'resume'})}}
                    >
                        <PlayCircleRoundedIcon className="uploading_icon" />
                    </div>
                )}
            </>
            </div>
        </div>
    </div>
  )
}

export default Uploading