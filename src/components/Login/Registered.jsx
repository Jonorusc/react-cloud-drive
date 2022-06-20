import React from 'react'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import logincomplete from '../../images/login_complete.svg'

export default function Registered({ email, rest }) {
  return (
    <div className='registered'>
       <div className="registered_logo">
            <AddToDriveIcon className='logo_icon' />
            <span className="text">Cloud Drive</span>
        </div>
        <div className="registered_ilustration">
            <img src={logincomplete} alt="thank you" />
        </div>
        <p className='registered_text'>
            <span>Your registration has just been completed!</span>
            <span>We sent you an email with a verification link to activate your account.</span>
            <span><small>Please check your email inbox</small></span>
            <span><small>{email}</small></span>
        </p>
        <p className="re-send-email">
            <span>Haven't received it yet?</span>
            <a href="#resend"> send another link</a>
        </p>
    </div>
  )
}
