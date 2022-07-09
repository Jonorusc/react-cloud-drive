import React, { useState, useRef, useEffect, useContext  } from 'react'
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded'
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded'
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded'
// helpers
import useClickOutSide from '../../helpers/clickOutside'
import UserDrive from '../../helpers/userDrive'
import ManageDb from '../../config/ManageDb'
import { useMediaQuery } from "react-responsive"

function ContentItem({ title, preview, item, index, active, setItemOptions }) {
    const [onContextMenu, setOnContextMenu] = useState(false),
        { userDrive, setUserDrive } = useContext(UserDrive),
        menuRef = useRef(),
        mobile = useMediaQuery({
            query: "(max-width: 720px)",
        })

    useEffect(() => {
        // console.log(item)
        // eslint-disable-next-line
    }, [])

    useClickOutSide(menuRef, () => {
        if(onContextMenu)setOnContextMenu(false)        
    })

    function onDblClick(e) {
        if(item?.data?.type === 'folder') {
            if(userDrive?.lastFolder !== '') {
                const manageDb = new ManageDb(userDrive?.user, [...userDrive?.lastFolder])
                manageDb.stopReading()
            }
            const current = userDrive?.currentFolder
            current.push(item?.data?.name?.toString())
            
            setUserDrive({
                ...userDrive,
                currentFolder: current,
                currentFile: '',
            })
        } else if(item?.data?.type === 'file') {
            
        }
    }

    function onClick(e) {
        // if the user is using mobile phone, we'll open the folder when 'onclick'
        if(mobile) {
            onDblClick(e)
            return 
        }
        if(e.ctrlKey) {
            let activeTemp = userDrive?.isActive, currentFile
            if(userDrive?.isActive.indexOf(item?.key) !== -1) 
                activeTemp.splice(userDrive?.isActive.indexOf(item?.key), 1)
             else 
                activeTemp.push(item?.key)

            // current file
            if(activeTemp.length > 1)
                currentFile = 'Several items selected'
            else 
                currentFile = title
            // end current file

            setUserDrive({
                ...userDrive,
                isActive: activeTemp,
                currentFile,
            })
        } else {
            setUserDrive({
                ...userDrive,
                isActive: [item?.key],
                currentFile: title,
            })
        }
    }

    return (
        <div className='content_item_wrapper'>
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
                            <div className="options_item" 
                                    onClick={() => {setItemOptions({
                                        action: 'rename',
                                        payload: {
                                            key: item?.key,
                                            index,
                                        },
                                        name: item?.data?.name,
                                    })
                                    setOnContextMenu(false)
                                }}
                            >
                                <DriveFileRenameOutlineRoundedIcon className='item_icon' />
                                Rename    
                            </div>
                            {item?.data.type !== 'folder' && (
                                <div className="options_item"
                                    onClick={() => {setItemOptions({
                                            action: 'download',
                                            payload: item?.data?.downloadURL,
                                            name: item?.data?.name
                                        })
                                        setOnContextMenu(false)
                                    }}
                                >
                                    <DownloadRoundedIcon className='item_icon' />
                                    Download
                                </div>
                            )}
                            <div className="options_item"
                                onClick={() => {setItemOptions({
                                        action: 'movetotrash',
                                        payload: {
                                            key: item?.key,
                                            excluded: true,
                                            index,
                                        },
                                        name: item?.data?.name
                                    })
                                    setOnContextMenu(false)
                                }}
                            >
                                <DeleteForeverRoundedIcon className='item_icon' />
                                Move to trash
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContentItem