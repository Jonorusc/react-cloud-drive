import React, { useRef } from 'react'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import SearchIcon from '@mui/icons-material/Search'

import './Header.css'
import useClickOutside from '../../../helpers/clickOutside'

function Header({ hidesidebar, setHideSdebar }) {
    const inputRef = useRef()

    function showInput(){
        inputRef.current.classList.toggle('active')
    }

    useClickOutside(inputRef, () => {
        inputRef.current.classList.remove('active')
    })

    return (
        <header>
            <nav>
                <div className="header__logo" onClick={() => {window.location.reload();}}>
                    <AddToDriveIcon />
                    <span className="text">Cloud Drive</span>
                </div>
                <div className="header__search">
                    <SearchIcon 
                        onClick={() => {showInput()}} 
                        className='header_serachIcon'
                    />
                    <input 
                        ref={inputRef} type="text" 
                        placeholder='search for all' 
                        className="header_input" 
                    />
                    <div className={hidesidebar ? 'header_menu active' : 'header_menu'} onClick={() => {setHideSdebar(hidesidebar => !hidesidebar)}}>
                        <div className="line one"></div>
                        <div className="line two"></div>
                        <div className="line three"></div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header