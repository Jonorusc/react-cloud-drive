import React, { useEffect, useState } from 'react'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import { Link } from 'react-router-dom'
import FindAccount from '../../components/Forgot/FindAccount'
import ConfirmAccount from '../../components/Forgot/ConfirmAccount'
import SendCode from '../../components/Forgot/SendCode'
import ChangePassword from '../../components/Forgot/ChangePassword'
import { useSelector } from 'react-redux'

import './Forgot.css'

function Forgot() {
    const { user } = useSelector((state) => ({ ...state })),
        [step, setStep] = useState(0),
        [loading, setLoading] = useState(false),
        [userInfo, setUserInfo] = useState(''),
        [error, setError] = useState(''),
        [email, setEmail] = useState(''),
        [code, setCode] = useState(''),
        [password, setPassword] = useState('')

    useEffect(() => {
        // user is already logged in
        if(!user) 
            return 
        
        setUserInfo(user)
        setStep(1)
        // eslint-disable-next-line
    }, [])

    return (
        <div className="forgot">
            <div className="header">
                <Link className="header_logo" to="/">
                    <AddToDriveIcon />
                    <span className="text">Cloud Drive</span>
                </Link>
                <Link to="/" className="btn_cancel">
                    Cancel
                </Link>
            </div>
            {step === 0 && !userInfo && (
                <FindAccount
                    setStep={setStep}
                    email={email}
                    setEmail={setEmail}
                    error={error}
                    setError={setError}
                    loading={loading}
                    setLoading={setLoading}
                    setUserInfo={setUserInfo}
                />
            )}
            {step === 1 && userInfo && (
                <ConfirmAccount
                    setStep={setStep}
                    userInfo={userInfo}
                    setUserInfo={setUserInfo}
                    error={error}
                    setError={setError}
                />
            )}
            {step === 2 && userInfo && (
                <SendCode
                    setStep={setStep}
                    setCode={setCode}
                    error={error}
                    setError={setError}
                    code={code}
                    userInfo={userInfo}
                />
            )}
            {step === 3 && userInfo && (
                <ChangePassword
                    setStep={setStep}
                    password={password}
                    setPassword={setPassword}
                    error={error}
                    setError={setError}
                    userInfo={userInfo}
                />
            )}
        </div>
    )
}

export default Forgot
