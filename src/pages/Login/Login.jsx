import React, { useState } from 'react'
import loginilustration from '../../images/login_join.svg'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
// components
import LoginForm from '../../components/Login/LoginForm'
import RegisterForm from '../../components/Login/RegisterForm'

import './Login.css'

function Login() {
    const [visible, setVisible] = useState(false)
    return (
        <div className="login_page">
            <div className="login_ilustration"><img src={loginilustration} alt="welcome"/></div>
            <div className='login_wrapper'>
                <div className="login_logo">
                    <AddToDriveIcon className='logo_icon' />
                    <span className="text">Cloud Drive</span>
                </div>
                <div className="login">
                    <LoginForm />
                </div>
                <div className="register">
                    <strong><h4 className='register_text'>haven't you an account?</h4></strong>
                    <button 
                        className='btn-primary' 
                        type="submit"
                        onClick={() => {setVisible(true)}}
                    >
                        Sign-up
                    </button>
                </div>
            </div>
            {visible && <RegisterForm setVisible={setVisible} />}
        </div>
    )
}

export default Login