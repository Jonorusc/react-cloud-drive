import React, {useRef} from 'react'
import Avatar from '@mui/material/Avatar' 
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import AsideOption from './AsideOption'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'

import userProfile from '../images/WhatsApp Image 2022-04-27 at 13.26.56.jpeg'
import './User.css'

function User( {name} ) {
    // const [open, setOpen] = useState(),
    const modalRef = useRef()

    // useEffect(() => {
    //     if(modalRef.current !== null && modalRef.current !== undefined) {
    //         setTimeout(() => {
    //             modalRef.current.classList.toggle('active')
    //         }, 10);
    //     }
    // }, [open])

    function Modal() {
        return (
            <div 
                ref={modalRef}
                className='user_modal' 
            >
                <AsideOption Icon={AccountCircleRoundedIcon} option='My Profile' active={false}/>
                <AsideOption Icon={LogoutRoundedIcon} option='Log-out' active={false}/>
            </div>
        )
    }

    return (
        <div className='user' onClick={() => {modalRef.current.classList.toggle('active')}}>
            <Avatar sx={{
                width: 40, height: 40}} 
                src={userProfile}
            />
            <span className="user_name">{name}</span>
            <ArrowDropDownIcon />

            <Modal />
        </div>
    )
}

export default User