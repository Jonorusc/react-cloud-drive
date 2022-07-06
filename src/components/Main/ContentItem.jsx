import React, { useState, useRef, useEffect, useContext  } from 'react'
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded'
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded'
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded'
// helpers
import useClickOutSide from '../../helpers/clickOutside'
import UserDrive from '../../helpers/userDrive'

function ContentItem({ title, preview, itemKey, item, index, active }) {
    const [onContextMenu, setOnContextMenu] = useState(false),
        { userDrive, setUserDrive } = useContext(UserDrive),
        menuRef = useRef()

    useEffect(() => {
        // eslint-disable-next-line
    }, [])

    useClickOutSide(menuRef, () => {
        setOnContextMenu(false)
    })

    function onDblClick(e) {
        if(item?.data?.type === 'folder') {
            console.log('abrir pastas')
        } else if(item?.data?.type === 'file') {
            
        }
    }

    function onClick(e) {
        if(e.ctrlKey) {
            let activeTemp = userDrive?.isActive, currentFile
            if(userDrive?.isActive.indexOf(itemKey) !== -1) {
                activeTemp.splice(userDrive?.isActive.indexOf(itemKey), 1)
            } else {
                activeTemp.push(itemKey)
            }

            // current file
            if(activeTemp.length > 1){
                currentFile = 'Several items selected'
            } else {
                currentFile = title
            }
            // end current file

            setUserDrive({
                ...userDrive,
                isActive: activeTemp,
                currentFile,
            })
        } else {
            setUserDrive({
                ...userDrive,
                isActive: [itemKey],
                currentFile: title,
            })
        }
    }

    return (
        <div className={active ? "content_item active" : "content_item"}
            onContextMenu={(e) => {
                e.preventDefault()
                setOnContextMenu(true)
            }}
            onClick={(e) => {
                onClick(e)
            }}
            onDoubleClick={(e) => {
                onDblClick(e)
            }}
        >   
            <div className="content_preview">
                <img src={preview} 
                alt={title} 
            />
            </div>
            <span className="content_title">{title}</span>
            <div className={onContextMenu ? "content_item_options active" : "content_item_options"} ref={menuRef}>
                <div className="blur">
                    <div className="options">
                        <div className="options_item">
                            <DriveFileRenameOutlineRoundedIcon className='item_icon' />
                            Rename
                        </div>
                        <div className="options_item">
                            <DownloadRoundedIcon className='item_icon' />
                            Download
                        </div>
                        <div className="options_item">
                            <DeleteForeverRoundedIcon className='item_icon' />
                            Move to trash
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContentItem