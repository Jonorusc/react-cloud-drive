import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'

function Notifications({ user }) {
    const [message, setMessage] = useState(''),
    [error, setError] = useState(''),
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
        setTimeout(() => {
            setError('')
            setMessage('')
        }, 10000)
    }, [error, message])

    return (
        <div className='notifications'>
            <div className="notifications_body">
                <span className='body_text'>Useful links</span>
                <div className="body">
                    <div className="body_item">
                        <p>change your password if you forgot it. Did you forget your password?</p>
                        <a href='/forgot' className='body_button'>i forgot my password</a>
                    </div>
                    {!user.verified && !message && !error && (
                        <div className="body_item">
                            <p>We see that you have not activated your account yet. If you do not activate it, you will not be available to enjoy all our features</p>
                            <button 
                                onClick={() => {sendVerification()}}
                                className='body_button'
                            >
                                activate my account
                            </button>
                        </div>
                    )}
                    {message && !error &&(
                        <div className="body_item">
                            <span><small>We just sent you another verification email, please check your inbox, expires in 30 minutes</small></span>
                            <br />
                            <span><small>If you haven't received it yet. You can login and try again later</small></span>
                        </div>
                    )}
                    {error && (
                        <div className="body_item">
                            <span><small style={{color: 'red'}}>{error}</small></span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Notifications