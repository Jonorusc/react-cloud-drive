import React, { useContext } from 'react'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
// import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded'
// import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded'
// import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded'
import CreateNewFolderRoundedIcon from '@mui/icons-material/CreateNewFolderRounded'
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded'
// import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded'
// components
import NewsOptions from './NewsOptions'
import UserDrive from '../../helpers/userDrive'
import BreadCrumbs from './BreadCrumbs'

function Menu({ view, setView, dropdown, setDropdown }) {
    const {userDrive, setUserDrive } = useContext(UserDrive)

    return (
        <>
            <ul className="main_options_menu">
                <li
                    className="menu_item"
                    onMouseEnter={() => {setDropdown(1)}}
                    onMouseLeave={() => {setDropdown(0)}}
                >
                    <AddRoundedIcon className="item_icon" />
                    <span className="item_text">Add</span>
                    <div className={dropdown === 1 ? "item_dropdown active" : "item_dropdown"}>   
                        <div className="dropdown_item"
                            onClick={() => {
                                setView('folder')
                            }}
                        >
                            <CreateNewFolderRoundedIcon className="dropdown_item_icon" /> Folder
                        </div>
                        <div className="dropdown_item"
                            onClick={() => {
                                setView('file')
                            }}
                        >
                            <UploadFileRoundedIcon className="dropdown_item_icon" /> Files
                        </div>
                    </div>
                </li>
            </ul>
            <BreadCrumbs userDrive={userDrive} setUserDrive={setUserDrive}/>
            <div className={view === 'folder' ? "new_options active" : "new_options"}>
                <NewsOptions type="folder" setView={setView} view={view} />
            </div> 
            <div className={view === 'file' ? "new_options active" : "new_options"}>
                <NewsOptions type="file" setView={setView} view={view} />
            </div>
        </>
    )
}

export default Menu