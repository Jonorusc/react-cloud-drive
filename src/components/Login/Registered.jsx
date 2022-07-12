import React, { useEffect, useState } from 'react'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import logincomplete from '../../images/login_complete.svg'
import Cookies from 'js-cookie'
import axios from 'axios'
import Firestore from '../../helpers/Firestore'


export default function Registered({ email, rest }) {
    const [message, setMessage] = useState(''),
        [error, setError] = useState(''),
        user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null,
        sendVerification = async () => {
            try {
                const { data } = await axios.post('http://localhost:8000/sendverification', {}, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    }
                })
                setMessage(data.message)
            } catch (err) {
                
                setError(err.response.data.message)
            }
        }

    useEffect(() => {
        // create a firestore collection for storage
        let task = Firestore('set', user.username, {
            capacity: 150000000,
            inUse: 0,
        })
        if(!task) {
            console.log('there was an error in firestore')
        }
        // eslint-disable-next-line
    }, [])    
    
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
            {!message && (
                <p className="re-send-email">
                    <span>Haven't received it yet?</span>
                    <a 
                        href="#resend"
                        onClick={() => {sendVerification()}}
                    > send another link</a>
                    <br />
                </p>
            )}
            {message && (
                <p className="re-send-email" style={{textAlign: 'center'}}>
                    <span><small>We just sent you another verification email, please check your inbox, expires in 30 minutes</small></span>
                    <br />
                    <span><small>If you haven't received it yet. You can login and try again later</small></span>
                    <br />
                    <span><small><a href="/login">login</a></small></span>
                </p>
            )}
            {error && (
                 <p className="re-send-email" style={{textAlign: 'center', color: '#E56A6A90'}}>
                    <span><small>{error}</small></span>
                    <br />
                    <span><small><a href="/login">login</a></small></span>
                </p>
            )}
        </div>
    )
}
