import React, { useState, useRef } from 'react'
import Avatar from '@mui/material/Avatar'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
// import AsideOption from '../Aside/AsideOption'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import useClickOutside from '../../../helpers/clickOutside'
import { useDispatch } from 'react-redux'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'

import './User.css'

function User({ name, picture }) {
    const [modal, openModal] = useState(false),
        modalRef = useRef(),
        dispatch = useDispatch()

    function handleModal() {
        modal ? openModal(false) : openModal(true)
    }

    useClickOutside(modalRef, () => {
        openModal(false)
    })

    function logout() {
        Cookies.set('user', '')
        dispatch({
            type: 'LOGOUT',
        })
        window.location.href = '/login'
    }

    function Modal() {
        return (
            <div className={modal ? 'user_modal active' : 'user_modal'}>
                <Link className="aside_options" to="/profile">
                    <AccountCircleRoundedIcon />
                    <span className="option">My Profile</span>
                </Link>
                <Link
                    className="aside_options"
                    to="#logout"
                    onClick={() => {
                        logout()
                    }}
                >
                    <LogoutRoundedIcon />
                    <span className="option">Logout</span>
                </Link>
            </div>
        )
    }

    return (
        <div
            className="user"
            onClick={() => {
                handleModal()
            }}
            ref={modalRef}
        >
            <Avatar
                sx={{
                    width: 40,
                    height: 40,
                }}
                src={picture}
            />
            <span className="user_name">{name}</span>
            <ArrowDropDownIcon
                sx={{ transform: modal ? 'rotate(180deg)' : '' }}
            />

            <Modal />
        </div>
    )
}

export default User
