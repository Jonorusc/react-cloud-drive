import React, { useRef } from 'react'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import SearchIcon from '@mui/icons-material/Search'
// import MenuRoundedIcon from '@mui/icons-material/MenuRounded'

import './Header.css'

function Header({ hideAside }) {
    const inputRef = useRef(),
        toggle = useRef()

    function showInput(){
        inputRef.current.classList.toggle('active')
    }

    function toogleSidebar() {
        toggle.current.classList.toggle('active')
        
        !toggle.current.classList.contains('active') ? hideAside(false) : hideAside(true)
    }

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
                    {/* <MenuRoundedIcon className='header_menu'
                        onClick={hideSidebar}
                    />  */}
                    <div ref={toggle} className="header_menu" onClick={toogleSidebar}>
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