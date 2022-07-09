import React, { useEffect, useContext, useState, useRef } from 'react'
import ContentItem from './ContentItem'
import UserDrive from '../../helpers/userDrive'
import ManageDb from '../../config/ManageDb'
import DotLoader from 'react-spinners/DotLoader'
import folder from '../../images/folder.svg'
import video from '../../images/video.svg'
import document from '../../images/document.svg'
import pdf from '../../images/pdf.svg'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import useClickOutside from '../../helpers/clickOutside'
import Notification from '../Notification/Notification'

function Content() {
    const { userDrive, setUserDrive } = useContext(UserDrive),
        [folderListener, setFolderListener] = useState([]),
        [loading, setLoading] = useState(true),
        [itemOptions, setItemOptions] = useState({}),
        inputOptionsRef = useRef(),
        itemActionRef = useRef(),
        downloadRef = useRef()
 
    useEffect(() => {
        // storing lastfolder in userdrive.lastfolder
        storingLastFolder()

        // getting firebase data and storing in folderListener
        // readFiles()

        // turn loading off
        setTimeout(() => {
            setLoading(false)
        }, 2000)
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        console.log(userDrive)
        readFiles()
        // eslint-disable-next-line
    }, [userDrive])

    useEffect(() => {
        console.log(folderListener)
    }, [folderListener])

    function storingLastFolder() {
        setUserDrive({
            ...userDrive,
            isActive: [],
            currentFile: '',
            lastFolder: userDrive?.currentFolder.join('/'),
        })
    }

    async function readFiles() {
        let tempData = []
        const manageDb = new ManageDb(userDrive?.user, userDrive?.currentFolder)
        await manageDb.read((snapshot) => {
            snapshot.forEach(item => {
                if(item.val().excluded) return
                tempData.push({
                    key: item.key,
                    data: item.val()
                })
            })
            tempData.sort((a,b) => {
                return (a.data.type && b.data.type) === 'folder' ? 1 : -1
            })
            setFolderListener(tempData)
        })
    }

    // items options

    // download and movetotrash
    useEffect(() => {
        switch(itemOptions.action) {
            case 'download': 
                downloadRef.current.click()
                setTimeout(() => {
                    setItemOptions({})
                }, 2000)
                setItemOptions({})
            break 
            case 'movetotrash':
                const manageDb = new ManageDb(userDrive?.user, userDrive?.currentFolder)
                let current = folderListener[itemOptions.payload.index]?.data
                current.excluded = itemOptions.payload.excluded
                manageDb.updateKey(itemOptions.payload.key, current)
                // refresh
                setUserDrive({
                    ...userDrive,
                    currentFile: ''
                })
                setItemOptions({})
            break
                default: break
        }
        // eslint-disable-next-line
    }, [itemOptions])

    // rename
    function renameFile() {
        const manageDb = new ManageDb(userDrive?.user, userDrive?.currentFolder)
        let current = folderListener[itemOptions.payload.index]?.data
        current.name = inputOptionsRef.current.value
        manageDb.updateKey(itemOptions.payload.key, current)
        // refresh
        setUserDrive({
            ...userDrive,
            currentFile: current.name,
        })
        setItemOptions({})
    }

    useClickOutside(itemActionRef, () => {
        setItemOptions({})
    })
    
    return (
        <>
            <div className="content">
                {folderListener?.length > 0 ? (
                    <>
                        {folderListener?.map((item, i) => {
                            let title, preview
                            if (item?.data?.name?.length > 46)
                                title = `${item?.data?.name.substr(0,40)}...${item?.data?.contentType ? item?.data?.contentType.substr(item?.data?.contentType.lastIndexOf('/')).replace('/', '.'): ''}`
                            else title = item?.data?.name

                            if(item?.data.type === 'folder') {
                                preview = folder
                            } else if(item?.data.type === 'file') {
                                switch(item?.data.contentType){
                                    case 'application/pdf':
                                        preview = pdf
                                        break
                                    case 'image/gif':
                                    case 'image/png':
                                    case 'image/svg':
                                    case 'image/jpeg':
                                    case 'image/jpg':
                                    case 'image/webp':
                                        preview = item?.data?.preview
                                        break
                                    case 'video/mp4':
                                    case 'video/avi':
                                    case 'video/wav':
                                        preview = video
                                        break
                                    default: 
                                        preview = document
                                        break
                                }
                            }

                            return (
                                <React.Fragment key={i}>
                                    {item.data.name && (
                                        <ContentItem 
                                            title={title} 
                                            preview={preview} 
                                            item={item} index={i} 
                                            active={userDrive?.isActive.indexOf(item.key) !== -1 ? true: false} 
                                            setItemOptions={setItemOptions}
                                        />
                                    )}
                                </React.Fragment>
                            )
                        })}
                    </>
                ) : (
                    <>
                        <div className="loading">
                            <DotLoader color="#00000097" loading={loading} size={30} />
                            {!loading && <div className="empty">There's nothing here</div>}
                        </div>
                    </>
                )}
                {itemOptions?.action === 'rename' && (
                    <div className='item_options'>
                        {console.log(itemOptions)}
                        {itemOptions.action === 'rename' && (
                            <div className="item_action" ref={itemActionRef}>
                                <div className='item_action_header'>
                                    <span className="action_title">Rename</span>
                                    <CloseRoundedIcon  className='action_close' 
                                        onClick={() => {setItemOptions({})}}
                                    />
                                </div>
                                <div className='item_action_body'>
                                    <input type="text" ref={inputOptionsRef} placeholder={itemOptions.name} />
                                </div>
                                <button className='item_action_button' onClick={() => {
                                    if(inputOptionsRef.current.value !== '') renameFile()
                                    else inputOptionsRef.current.placeholder = 'You must type a name'
                                }}>
                                    Ok
                                </button>
                            </div>
                        )}
                    </div>
                )}
                <div className={(itemOptions.action === 'download' || itemOptions.action === 'movetotrash') ? "notifications active" : "notifications"}
                    ref={itemActionRef}
                >
                    {itemOptions.action === 'download' && (
                        <>
                            <a href={itemOptions.payload} download={itemOptions.name} ref={downloadRef}
                                target='_blank' rel="noreferrer"
                            >
                                <Notification title="Your download has already started" />
                            </a>
                        </>
                    )}
                    {itemOptions.action === 'movetotrash' && (
                        <>
                            <Notification title="has been moved to trash" fileName={`${itemOptions.name}`} />
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default Content