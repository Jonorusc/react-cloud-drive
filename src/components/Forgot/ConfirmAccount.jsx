import React, { useRef } from 'react'
import Avatar from '@mui/material/Avatar'
import axios from 'axios'

function ConfirmAccount({ setStep, userInfo, setUserInfo, setError, error}) {
    const radio = useRef()

    async function check() {
        if(!radio.current.checked)
            return setError('it is necessary to choose an option')
        
            try {
                await axios.post('http://localhost:8000/sendresetcode', {
                    email: userInfo.email,
                })

                setTimeout(() => {
                    setError('')
                    setStep(2)
                }, 1000);
            } catch (err) {
                setError(err.response.data.message)
            }
        
    }

    function notMe() {
        setStep(0) 
        setUserInfo('')
    }

    return (
        <div className="content">
            <div className="box short_padding">
                <div className="avatar">
                    <Avatar className="_avatar" src={userInfo.picture} />
                    <div className="info">
                        <h3 className="infoe_firstname">{userInfo.first_name}</h3>
                        <h5 className="info_email">{userInfo.email}</h5>
                    </div>
                </div>
                <div className="box_grid">
                    <div>
                        <h5 className="box_text text-start">
                            How do you want to receive the password reset code?
                        </h5>
                        <div className="align-center justify-start">
                            <input ref={radio} type="radio" className="input_radio"/>
                            <span className="input_radio_text">
                                send me the code by email
                            </span>
                        </div>
                    </div>
                    <div className="buttons align-end justify-center flex-column row-gap">
                        <button 
                            onClick={() => {check()}}
                            className="box_btn" 
                        >
                            Send
                        </button>
                        <button 
                            className="box_btn bg-black"
                            onClick={() => {notMe()}}
                        >Isn't me</button>
                    </div>
                </div>
                {error && <span className="error">{error}</span>}
            </div>
        </div>
    )
}

export default ConfirmAccount
