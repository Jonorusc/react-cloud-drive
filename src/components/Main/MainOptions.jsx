import React, { useState } from 'react'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded'
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded'
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded'
import CreateNewFolderRoundedIcon from '@mui/icons-material/CreateNewFolderRounded'
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded'
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded'
// components
import NewsOptions from './NewsOptions'


function MainOptions() {
    const [dropdown, setDropdown] = useState(0),
        [view, setView] = useState('')

    function onClickOption(option) {
        switch (option) {
            case 'newFolder':
                setView('folder')
                break
            case 'newFile':
                setView('file')
                break
            case 'rename':
                console.log('rename')
                break
            case 'trash':
                console.log('move to trash')
                break
            case 'download':
                console.log('download')
                break
            default:
                return
        }
    }

    return (
        <div className="main_options">
            <ul className="main_options_menu">
                <li
                    className="menu_item"
                    onMouseEnter={() => {setDropdown(1)}}
                    onMouseLeave={() => {setDropdown(0)}}
                >
                    <AddRoundedIcon className="item_icon" />
                    <span className="item_text">New</span>
                    {dropdown === 1 && (
                        <div className="item_dropdown">   
                            <div className="dropdown_item"
                                onClick={() => {
                                    onClickOption('newFolder')
                                }}
                            >
                                <CreateNewFolderRoundedIcon className="dropdown_item_icon" /> Create a new folder
                            </div>
                            <div className="dropdown_item"
                                onClick={() => {
                                    onClickOption('newFile')
                                }}
                            >
                                <UploadFileRoundedIcon className="dropdown_item_icon" /> Upload a file
                            </div>
                        </div>
                    )}
                </li>
                <li
                    className="menu_item"
                    onMouseEnter={() => {setDropdown(2)}}
                    onMouseLeave={() => {setDropdown(0)}}
                >
                    <DriveFileRenameOutlineRoundedIcon className="item_icon" />
                    <span className="item_text">Rename</span>
                    {dropdown === 2 && (
                        <div className="item_dropdown"
                            onClick={() => {
                                onClickOption('rename')
                            }}
                        >   
                            <div className="dropdown_item">
                                <input type="text" placeholder='item name'/>
                                <CheckBoxRoundedIcon className="dropdown_item_icon" 
                                    onClick={() => {console.log('rename')}}
                                /> 
                            </div>
                        </div>
                    )}
                </li>
                <li
                    className="menu_item"
                    onClick={() => {
                        onClickOption('trash')
                    }}
                >
                    <DeleteForeverRoundedIcon className="item_icon" />
                    <span className="item_text">Move to Trash</span>
                </li>
                <li
                    className="menu_item"
                    onClick={() => {
                        onClickOption('download')
                    }}
                >
                    <DownloadRoundedIcon className="item_icon" />
                    <span className="item_text">Download</span>
                </li>
            </ul>
            {view === 'folder' && <NewsOptions type="folder" setView={setView} />}
            {view === 'file' && <NewsOptions type="file" setView={setView} />}
        </div>
    )
}

export default MainOptions
