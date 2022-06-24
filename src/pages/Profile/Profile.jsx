import React from 'react'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import UserInfo from '../../components/Profile/UserInfo'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import Notifications from '../../components/Profile/Notifications'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import './Profile.css'

function Profile() {
    const { user } = useSelector((user) => ({ ...user }))
    return (
        <div className='profile'>
            <header className="header">
                <Link className="header_logo" to="/">
                    <AddToDriveIcon /> 
                    <span className="text">Cloud Drive</span>
                </Link>
                |
                <Link to="/">   
                    <HomeRoundedIcon /> Go Home
                </Link>
            </header>
            <div className="profile_main">
                <UserInfo user={user}/>
                <Notifications user={user}/>
            </div>
        </div>
  )
}

export default Profile