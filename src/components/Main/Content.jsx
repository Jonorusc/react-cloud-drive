import React, { useEffect, useContext, useState, useRef } from 'react'
import ContentItem from './ContentItem'
import UserDrive from '../../helpers/userDrive'
import DotLoader from 'react-spinners/DotLoader'
import folder from '../../images/folder.svg'
import video from '../../images/video.svg'
import document from '../../images/document.svg'
import pdf from '../../images/pdf.svg'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import useClickOutside from '../../helpers/clickOutside'
import itemsOptions from '../../helpers/itemsOptions'
import Notification from '../../components/Notification/Notification'
import Preview from '../Preview/Preview'
import { saveAs } from 'file-saver'
import Firestore from '../../helpers/Firestore'

function Content({ url }) {
    const { userDrive, setUserDrive } = useContext(UserDrive),
        [folderListener, setFolderListener] = useState([]),
        [loading, setLoading] = useState(true),
        [itemOptions, setItemOptions] = useState({}),
        [error, setError] = useState(''),
        [success, setSuccess] = useState(''),
        [showPreview, setPreview] = useState({}),
        inputOptionsRef = useRef(),
        itemActionRef = useRef()

    let sizeRef = useRef(0)

    useEffect(() => {
        readFiles()
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        // getting firebase data and storing in folderListener
        readFiles()
        // turn loading off
        setTimeout(() => {
            setLoading(false)
        }, 2000)
        // eslint-disable-next-line
    }, [userDrive])

    async function readFiles() {
        let task = null
        switch (url) {
            case 'content':
                task = await new itemsOptions({
                    user: userDrive?.user,
                    currentFolder: userDrive?.currentFolder,
                }).readAllowedItems()
                break
            case 'trash':
                task = await new itemsOptions({
                    user: userDrive?.user,
                    currentFolder: userDrive?.currentFolder,
                }).readTrashedItems()
                break
            default:
                break
        }
        sortFolders(task)
    }

    function sortFolders(data) {
        setFolderListener(
            data.sort((a, b) => {
                return (a.data.type && b.data.type) === 'folder' ? 1 : -1
            })
        )
    }
    // items options

    // download, restore, delete and movetotrash
    useEffect(() => {
        setPreview({})
        const db = {
                user: userDrive?.user,
                currentFolder: userDrive?.currentFolder,
            },
            excluded = itemOptions?.payload?.excluded,
            keys = itemOptions?.payload?.keys,
            file = itemOptions?.payload?.file

        let task = null
        switch (itemOptions.action) {
            case 'download':
                saveAs(itemOptions?.payload, `cloud-drive-${itemOptions.name}.jpeg`)
                setItemOptions({})
                break
            case 'movetotrash':
            case 'restore':
                task = new itemsOptions(db, folderListener, excluded)
                task.restoreOrToTrash(keys)
                    .then((resps) => {
                        resps.forEach((resp) => {
                            // refresh
                            setUserDrive({
                                ...userDrive,
                                currentFile: '',
                                currentFolder: [userDrive.user],
                            })
                        })
                        setSuccess('Sucessfully')
                        setItemOptions({})
                        setTimeout(() => {
                            setSuccess('')
                        }, 2000)
                    })
                    .catch((err) => {
                        setError('There was an error, try again later...')
                        setTimeout(() => {
                            setError('')
                        }, 2000)
                    })
                break
            case 'delete':
                task = new itemsOptions(db, folderListener)
                task.delete(keys)
                    .then((resps) => {
                        resps.forEach((resp) => {
                            // refresh
                            setUserDrive({
                                ...userDrive,
                                currentFile: '',
                                currentFolder: [userDrive.user],
                            })
                            sizeRef.current += resp.size
                            setSuccess('Sucessfully')
                            setItemOptions({})
                            setTimeout(() => {
                                setSuccess('')
                            }, 2000)
                        })
                        checkSize(sizeRef.current)
                    })
                    .catch((err) => {
                        setError('There was an error, try again later...')
                        setTimeout(() => {
                            setError('')
                        }, 2000)
                    })
                break
            case 'preview':
                if (file.data.contentType.includes('video')) {
                    let video = file.data
                    video.preview = file.data.downloadURL
                    setPreview({
                        preview: video.preview,
                        show: true,
                        ObjectURL: false,
                    })
                } else {
                    setPreview({
                        preview: file.data.preview,
                        show: true,
                        ObjectURL: true,
                    })
                }
                break
            default:
                break
        }
        // eslint-disable-next-line
    }, [itemOptions])
    
    useClickOutside(itemActionRef, () => {
        setItemOptions({})
    })
    
    // rename
    const renameFile = () => {
        const db = {
                user: userDrive?.user,
                currentFolder: userDrive?.currentFolder,
            }
        const keys = itemOptions?.payload?.keys
        const task = new itemsOptions(db, folderListener)

        task.rename(inputOptionsRef.current.value, keys).then((resps) => {
            resps.forEach((resp) => {
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

    const checkSize = async (size) => {
        let firesize = await Firestore('get', userDrive?.user)
        let newsize = firesize.inUse - size
        await Firestore('set', userDrive?.user, {
            capacity: 150000000,
            inUse: newsize,
        })
    }

    const getFileType = (file) => {
        return (file.data.contentType) ? file.data.contentType.substr(file.data.contentType.lastIndexOf('/')).replace('/', '.') : ''
    }

    const getFileTitle = (file) => {
        if (file?.data?.name?.length > 46) 
            return `${file.data.name.substr(0, 40)}...${getFileType(file)}`
        else 
            return file?.data?.name
    }

    const getFilePreview = (file) => {
        switch(file.data.type) {
            case 'folder': 
                return folder
            case 'file': 
                switch(file.data.contentType) {
                    case 'application/pdf':
                        return pdf
                    case 'image/gif':
                    case 'image/png':
                    case 'image/svg':
                    case 'image/jpeg':
                    case 'image/jpg':
                    case 'image/webp':
                        return file.data.preview
                    case 'video/mp4':
                    case 'video/avi':
                    case 'video/wav':
                        return video
                    default: return document
                }
            default: return null
        }
    }

    const RenderItems = () => {
        if (folderListener?.length > 0) {
            return folderListener.map((item, i) => {
                const title = getFileTitle(item)
                const preview = getFilePreview(item)

                return (
                    <React.Fragment key={i}>
                        <ContentItem 
                            title={title}
                            preview={preview}
                            item={item}
                            index={i}
                            active={userDrive?.isActive?.indexOf(item.key) !== -1 ? true : false}
                            setItemOptions={setItemOptions}
                            url={url}
                        />
                    </React.Fragment>
                )
            })
        } else {
            return (
                <div className="loading">
                    <DotLoader color="#00000097" loading={loading} size={30} />
                    {!loading && <div className="empty">There's nothing here</div>}
                </div>
            )
        }
    }

    const RenderOptions = () => {
        if(itemOptions.action === 'rename') {
            return (
                <div className='item_options'>
                    <div className='item_action' ref={itemActionRef}>
                        <div className='item_action_header'>
                            <span className='action_title'>Rename</span>
                            <CloseRoundedIcon 
                                className='action_close'
                                onClick={() => { setItemOptions({}) }}
                            />
                        </div>
                        <div className='item_action_body'>
                            <input type="text" ref={inputOptionsRef} placeholder={itemOptions.name}/>
                        </div>
                        <button
                            className='item_action_button'
                            onClick={() => {
                                (inputOptionsRef.current.value !== '') ? renameFile()
                                : inputOptionsRef.current.placeholder = 'You must type a name'
                            }}
                        > Ok 
                        </button>
                    </div>
                </div>
            )
        }
    }

    const ShowPreview = () => {
        if(showPreview && showPreview.show) {
            return <Preview file={showPreview} setPreview={setPreview} />
        }
    }

    const ShowNotifications = () => {
        if(success !== '' || error !== '') {
            return <Notification title={error ? error : success} />
        }
    }

    return (
        <div className='content'>
            <RenderItems />
            <RenderOptions />
            <ShowNotifications/>
            <ShowPreview/>
        </div>
    )
}
export default Content
