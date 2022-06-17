import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar' 
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import AsideOption from '../Aside/AsideOption'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'

// import userProfile from '../../../images/WhatsApp Image 2022-04-27 at 13.26.56.jpeg'
import './User.css'

function User({ name, picture }) {
    const [modal, openModal] = useState(false)

    function handleModal() {
        modal ? openModal(false) : openModal(true)
    }

    function Modal() {
        return (
            <div className={modal ? "user_modal active" : "user_modal"} >
                <AsideOption Icon={AccountCircleRoundedIcon} option='My Profile' active={false}/>
                <AsideOption Icon={LogoutRoundedIcon} option='Log-out' active={false}/>
            </div>
        )
    }

    return (
        <div className='user' onClick={() => {handleModal()}}>
            <Avatar sx={{
                width: 40, height: 40}} 
                src={picture}
            />
            <span className="user_name">{name}</span>
            <ArrowDropDownIcon sx={{transform: modal ? 'rotate(180deg)' : ''}}/>

            <Modal />
        </div>
    )
}

export default User