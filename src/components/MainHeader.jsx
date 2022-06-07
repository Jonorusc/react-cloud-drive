import React from 'react'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded'
import AutoDeleteRoundedIcon from '@mui/icons-material/AutoDeleteRounded'
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded'
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
        <HeaderItem Icon={FileDownloadRoundedIcon} title='Download'/>
    </div>
  )
}

export default MainHeader