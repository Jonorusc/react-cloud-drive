import React, { useContext, useEffect, useState } from 'react'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
// import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded'
// import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded'
// import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded'
import CreateNewFolderRoundedIcon from '@mui/icons-material/CreateNewFolderRounded'
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
// import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded'
// components
import NewsOptions from './NewsOptions'
import UserDrive from '../../helpers/userDrive'
import BreadCrumbs from './BreadCrumbs'
// helpers
import getFolders from '../../helpers/getFolders'

function Menu({ view, setView, dropdown, setDropdown, url }) {
    const {userDrive, setUserDrive } = useContext(UserDrive),
    [folders, showFolders] = useState(false),
    [folderListener, setFolderListener] = useState([])

    function setFolders() {
        const files = getFolders(userDrive?.user, userDrive?.currentFolder)
        setFolderListener(files)
    }

    useEffect(() => {
        setFolders()
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        setFolders()
        // eslint-disable-next-line
    }, [userDrive])
    
    return (
        <>
            {url === 'content' && (
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
            )}
            {url === 'trash' && (
                <div className='breadcrumbs_folders'
                    onMouseEnter={() => {
                        showFolders(true)
                    }}

                    onMouseLeave={() => {
                        showFolders(false)
                    }}
                >
                    <h5>Folders</h5>
                    <ArrowDropDownIcon className={folders ? 'folders_icon active' : 'folders_icon'} />
                    <div className={folders ? "breadcrumbs_folders_options active" : "breadcrumbs_folders_options"}>
                        <div className="blur">
                            {folderListener.length > 0 ? (
                                folderListener.map((item, i) => {
                                    return <div className="breadcrumbs_folders_item" key={i}
                                        onClick={() => {
                                            const current = userDrive?.currentFolder
                                            current.push(item.toString())
                                            
                                            setUserDrive({
                                                ...userDrive,
                                                currentFolder: current,
                                                currentFile: '',
                                            })
                                        }}
                                    >
                                        {item}
                                    </div>
                                })
                            ) : (
                                <div className="">Empty</div>
                            )}
                        </div>
                    </div>
                </div>
            )}
            <BreadCrumbs userDrive={userDrive} setUserDrive={setUserDrive} url={url}/>
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