import React from 'react'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'

import './Modal.css'

function Modal({ message, title, setModal }) {
    return (
        <div className='modal_notification'>
            <div className="modal_wrapper">
                <div className="modal_header">
                    <h5>{title}</h5>
                    <CloseRoundedIcon className='modal_header_icon' 
                        onClick={() => {
                            setModal('')
                        }}
                    />
                </div>
                <div className="modal_body">
                <p>{message}</p>
                </div>
            </div>
        </div>
    )
}

export default Modal