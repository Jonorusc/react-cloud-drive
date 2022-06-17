import React, { useState, useRef } from 'react'
import Avatar from '@mui/material/Avatar' 
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import AsideOption from '../Aside/AsideOption'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'

// import userProfile from '../../../images/WhatsApp Image 2022-04-27 at 13.26.56.jpeg'
import './User.css'
import useClickOutside from '../../../helpers/clickOutside'

function User({ name, picture }) {
    const [modal, openModal] = useState(false),
        modalRef = useRef()

    function handleModal() {
        modal ? openModal(false) : openModal(true)
    }

    useClickOutside(modalRef, () => {
        openModal(false)
    })

    function Modal() {
        return (
            <div 
                className={modal ? "user_modal active" : "user_modal"} 
                ref={modalRef}
            >
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