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
import itemsOptions from '../../helpers/itemsOptions'
import Notification from '../../components/Notification/Notification'
import { saveAs } from 'file-saver'

function Content({ url }) {
    const { userDrive, setUserDrive } = useContext(UserDrive),
        [folderListener, setFolderListener] = useState([]),
        [loading, setLoading] = useState(true),
        [itemOptions, setItemOptions] = useState({}),
        [error, setError] = useState(''),
        [success, setSuccess] = useState(''),
        inputOptionsRef = useRef(),
        itemActionRef = useRef()
 
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
        readFiles()
        // eslint-disable-next-line
    }, [userDrive])

    // useEffect(() => {
    //     console.log(folderListener)
    // }, [folderListener])

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
                // check url for content or trash
                switch(url) {
                    case 'content': 
                        if(item.val().excluded) return
                        // items used as reference in firebase
                        if(!item.val().name) return
                        tempData.push({
                            key: item.key,
                            data: item.val()
                        })
                    break
                    case 'trash': 
                        if(!item.val().name) return
                        if(item.val().excluded) {
                            tempData.push({
                                key: item.key,
                                data: item.val()
                            })
                        }
                    break
                    default: break
                }
            })
            // sort by folder first the folders then the files
            tempData.sort((a,b) => {
                return (a.data.type && b.data.type) === 'folder' ? 1 : -1
            })
            setFolderListener(tempData)
        })
    }

    // items options

    // download, restore, delete and movetotrash
    useEffect(() => {
        const db = {
            user: userDrive?.user, 
            currentFolder: userDrive?.currentFolder,
        },
        excluded = itemOptions?.payload?.excluded,
        keys = itemOptions?.payload?.keys

        let task = null
        switch(itemOptions.action) {
            case 'download': 
                saveAs(
                    itemOptions?.payload,
                    `cloud-drive-${itemOptions.name}.jpeg`
                )
                setItemOptions({})
            break 
            case 'movetotrash':
            case 'restore':
                task = new itemsOptions(db, folderListener, excluded)
                task.restoreOrToTrash(keys)
                .then(resps => {
                    resps.forEach(resp => {
                        console.log(resp)
                        // refresh
                        setUserDrive({
                            ...userDrive,
                            currentFile: '',
                            currentFolder: [userDrive.user],
                        })
                        setSuccess('Sucessfully')
                        setItemOptions({})
                        setTimeout(() => {
                            setSuccess('')
                        }, 2000)
                    })
                }).catch(err => {
                    setError('There was an error, try again later...')
                    setTimeout(() => {
                        setError('')
                    }, 2000)
                })
            break
            case 'delete':
                task = new itemsOptions(db, folderListener)
                task.delete(keys).then(() => {
                    // refresh
                    setUserDrive({
                        ...userDrive,
                        currentFile: '',
                        currentFolder: [userDrive.user],
                    })
                    setSuccess('Sucessfully')
                    setItemOptions({})
                    setTimeout(() => {
                        setSuccess('')
                    }, 2000)
                }).catch(err => {
                    setError('There was an error, try again later...')
                    setTimeout(() => {
                        setError('')
                    }, 2000)
                })
                // itemOptions.payload.keys.forEach(key => {
                //     current = folderListener.find(item => {
                //         return (item.key === key) ? item : null
                //     })
                //     if(current.data.type === 'file') {
                //         const tempFile = current.data.fullPath.split('/'),
                //         file = new ManageDb(userDrive?.user, userDrive?.currentFolder, tempFile)
                //         // remove file from storage
                //         file.deleteFile().then(() => {
                //             // remove ref from realtime database
                //             manageDb.removeRef(key)
                //             setSuccess('File removed successfully!')
                //         }).catch(err => {
                //             setError(err)
                //         })
                        
                //     } else if(current.data.type === 'folder') {
                //         // remove all content from this folder that is in storage database
                //         // manageDb.read(snapshot => {

                //         // })  
                //     }
                // })
            break
                default: break
        }
        // eslint-disable-next-line
    }, [itemOptions])

    // rename
    function renameFile() {
        const db = {
            user: userDrive?.user, 
            currentFolder: userDrive?.currentFolder,
        },
        keys = itemOptions?.payload?.keys,
        task = new itemsOptions(db, folderListener)
        task.rename(inputOptionsRef.current.value, keys)
        .then((resps) => {
            resps.forEach(resp => {
                // refresh
                setUserDrive({
                    ...userDrive,
                    currentFolder: resp.currentFolder,
                    currentFile: resp.currentFile,
                })
                setSuccess('Renamed successfully!')
                setItemOptions({})
                setTimeout(() => {
                    setSuccess('')
                }, 2000)
            })
        }).catch(() => {
            setError('There was an error, try again later...')
            setItemOptions({})
            setTimeout(() => {
                setError('')
            }, 2000)
        })
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
                                    <ContentItem 
                                        title={title} 
                                        preview={preview} 
                                        item={item} index={i} 
                                        active={userDrive?.isActive?.indexOf(item.key) !== -1 ? true: false} 
                                        setItemOptions={setItemOptions}
                                        url={url}
                                    />
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
                {(success || error) && (
                    <>
                        <Notification title={error ? error : success} />
                    </>
                )}
            </div>
        </>
    )
}

export default Content