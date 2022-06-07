import React from 'react'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded'
import AutoDeleteRoundedIcon from '@mui/icons-material/AutoDeleteRounded'
import SystemUpdateAltRoundedIcon from '@mui/icons-material/SystemUpdateAltRounded'

import './MainHeader.css'

function HeaderItem({ Icon, title }) {
    return (
        <div className="main_header_item">
            {Icon && <Icon className="main_header_item_icon" />}
            <span className="title">{title}</span>
        </div>
    )
}

function MainHeader() {
  return (
    <div className='main_header'>
        <HeaderItem Icon={AddRoundedIcon} title='New'/>
        <HeaderItem Icon={DriveFileRenameOutlineRoundedIcon} title='Rename'/>
        <HeaderItem Icon={AutoDeleteRoundedIcon} title='Move to Trash'/>
        <HeaderItem Icon={SystemUpdateAltRoundedIcon} title='Download'/>
    </div>
  )
}

export default MainHeader