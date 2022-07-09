import React, { useState, useEffect } from 'react'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import activationcompleted from '../../images/thanks.svg'
import activationfailed from '../../images/pending.svg'
import DotLoader from 'react-spinners/DotLoader'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'
// redux
import { useDispatch } from 'react-redux'

import './Activate.css'

function Activate() {
    const dispatch = useDispatch(),
        [loading, setLoading] = useState(false),
        [success, setSuccess] = useState(''),
        [error, setError] = useState(''),
        token = useParams(),
        user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null
        
    // on page load
    useEffect(() => {
        const activateAccount = async () => {
            setLoading(true)
            const { data } =  await axios.post('http://localhost:8000/activate', 
            { token: token.token }, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                }
            })
            setSuccess(data.message)
            Cookies.set('user', JSON.stringify({...user, verified: true}))
            dispatch({
                type: 'ACTIVATION',
                payload: true,
            })
            setTimeout(() => {
                window.location.href = '/mydrive'
            }, 5000)
        }
        activateAccount().catch(err => {
            setLoading(false)

            if(err.response.data.message === 'jwt expired'){
                setError('Token Expired!')
            } else if(err.response.data.message === 'jwt malformed') {
                setError('Invalid Token!')
            } else {
                setError(err.response.data.message)
            }
            setTimeout(() => {
                window.location.href = '/mydrive'
            }, 5000)
        })
        // eslint-disable-next-line
    },[])

    return (
        <div className="activate">
            <div className="activate_logo">
                <AddToDriveIcon className="logo_icon" />
                <span className="text">Cloud Drive</span>
            </div>
            {loading && (
                <DotLoader
                    color="#6986A5"
                    loading={loading}
                    size={30}
                    className="loader"
                />
            )}
            {success && (
                <>
                    <p className="activate_text">
                        <span>{success}</span>
                        <span>You will be redirected to the home page...</span>
                    </p>
                    <div className="activate_ilustration">
                        <img src={activationcompleted} alt="thank you" />
                    </div>
                </>
            )}
            {error && (
                <>
                    <p className="activate_text error">
                        <span>{error}</span>
                        <span>You will be redirected to the home page...</span>
                    </p>
                    <div className="activate_ilustration">
                        <img src={activationfailed} alt="thank you" />
                    </div>
                </>
            )}
        </div>
    )
}

export default Activate
