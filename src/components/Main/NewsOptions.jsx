import React, { useEffect, useRef, useState, useContext } from 'react'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite'
import DotLoader from 'react-spinners/DotLoader'
import folder from '../../images/folder.svg'
import document from '../../images/document.svg'
import pdf from '../../images/pdf.svg'
// components
import Preview from '../Preview/Preview'
import Upload from '../Upload/Upload'
import Modal from '../Modal/Modal'
// helpers
import Firestore from '../../helpers/Firestore'
import UserDrive from '../../helpers/userDrive'

function NewsOptions({ type, setView, view }) {
    const { userDrive } = useContext(UserDrive),
        optionsRef = useRef(),
        inputRef = useRef(),
        folderInputRef = useRef(),
        bodyFileRef = useRef(),
        gridRef = useRef(),
        sizeRef = useRef(0),
        [files, setFiles] = useState([]),
        [preview, setPreview] = useState({}),
        [loading, setLoading] = useState(false),
        [upload, setUpload] = useState(false),
        [uploadStatus, setUploadStatus] = useState(''),
        [modal, setModal] = useState('')

    useEffect(() => {
        setFiles(files)
    }, [files])

    useEffect(() => {
        async function checkUpload() {
            if(uploadStatus === 'success') {
                sizeRef.current = 0
                for(let i = 0; i < files.length; i++) {
                    sizeRef.current += files[i].file.size
                }
                let firesize = await Firestore('get', userDrive?.user)
                let newsize = firesize.inUse + sizeRef.current
                Firestore('set', userDrive?.user, {
                    capacity: firesize.capacity,
                        inUse: newsize,
                })
                setFiles([]) 
                setLoading(false)
                setUpload(false)
                setView('')
            }
        } 
        checkUpload()
        // eslint-disable-next-line
    }, [uploadStatus])

    //browser files
    function handleFiles(e) {
        let $files = Array.from(e.target.files)
        storeFiles($files)
    }

    // drop files
    function onDrop(e) {
        e.preventDefault()
        let $files = Array.from(e.dataTransfer.files)
        storeFiles($files)
    }

    // storeFiles in files
    function storeFiles($files) {
        $files.forEach((file) => {
            // filereader
            const reader = new FileReader()
            reader.onload = (e) => {
                // check if it's an image if yes then store them in preview
                if (file.type.includes('image') || file.type.includes('video')) {
                    setFiles((files) => [
                        ...files,
                        {
                            file,
                            preview: e.target.result,
                        },
                    ])
                } else if (file.type.includes('pdf')) {
                    setFiles((files) => [
                        ...files,
                        {
                            file,
                            preview: pdf,
                        },
                    ])
                } else {
                    setFiles((files) => [
                        ...files,
                        {
                            file,
                            preview: document,
                        },
                    ])
                }
            }
            reader.readAsDataURL(file)
        })
    }

    
    // showPreview
    function showPreview(index, video = false) {
        setPreview({})
        if (video) {
            const video = files[index]
            setPreview({ preview: video.file, show: true, ObjectURL: true })
            return
        }
        const file = files[index]
        setPreview({ preview: file.preview, show: true, ObjectURL: true })
    }
    
    // showAllInPreview
    function showFullPreview() {
        setPreview({ show: true, all: true })
    }
    
    // remove files from files
    function removeFromFiles(index) {
        files.splice(index, 1)
        setFiles((files) => [...files])
    }

    async function checkSize() { 
        sizeRef.current = 0
        for(let i = 0; i < files.length; i++) {
            sizeRef.current += files[i].file.size
        }
        let firesize = await Firestore('get', userDrive?.user)
        if(sizeRef.current >= firesize.capacity - firesize.inUse) {
            // the user can not continue
            setModal('You do not have space to store all this data, you can delete some items and try again')
        } else {
            setUpload(true)
            setLoading(true)
            setUploadStatus('')
        }
    }

    return (
        <>
            <div className="options" ref={optionsRef}>
                <div className="options_header">
                    <span className="text">
                        {type === 'folder' ? 'Create a folder' : 'Upload files'}
                    </span>
                    <div
                        className="close"
                        onClick={() => {
                            if (((preview && preview.show) || preview.all || loading) && view !== '') return
                                setView('')
                        }}
                    >
                        <CloseRoundedIcon />
                    </div>
                </div>
                {type === 'folder' ? (
                    <>
                        <div className="options_body">
                            <div className="wrap">
                                <img
                                    src={folder}
                                    alt="folder"
                                    className="options_body_icon"
                                />
                                <input
                                    ref={folderInputRef}
                                    type="text"
                                    name="folder_name"
                                    className="options_body_input"
                                    placeholder="Type here"
                                />
                            </div>
                            {!loading && (
                                <button
                                className="options_body_button"
                                onClick={() => {
                                    if (folderInputRef?.current?.value !== '') {
                                        setUploadStatus('')
                                        setUpload(true)
                                        setLoading(true)
                                    } else {
                                        folderInputRef.current.placeholder ='You must type a name'
                                    }
                                }}
                            >
                                Create
                            </button>
                            )}
                            <DotLoader
                                color="#6986A5"
                                loading={loading}
                                size={30}
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <div
                            className={
                                files
                                    ? 'options_body'
                                    : 'options_body align-center row-gap'
                            }
                            encType="multipart/form-data"
                        >
                            {files && files.length ? (
                                <div className="body_grid" ref={gridRef}>
                                    {files.slice(0, 7).map((item, i) => {
                                        if (item.file.type.includes('image')) {
                                            return (
                                                <div
                                                    className="preview"
                                                    key={i}
                                                    data-index={i}
                                                >
                                                    <img
                                                        src={item?.preview}
                                                        alt={`preview_${i}`}
                                                        onClick={() => {
                                                            !loading &&
                                                                showPreview(
                                                                    i
                                                                )
                                                        }}
                                                    />
                                                    <div
                                                        className="excluzion_icon"
                                                        onClick={() => {
                                                            !loading &&
                                                                removeFromFiles(
                                                                    i
                                                                )
                                                        }}
                                                    >
                                                        <CloseRoundedIcon className="icon" />
                                                    </div>
                                                </div>
                                            )
                                        } else if (item.file.type.includes('video')) {
                                            return (
                                                <div
                                                    className="preview"
                                                    key={i}
                                                    data-index={i}
                                                >
                                                    <video
                                                        src={item?.preview}
                                                        muted
                                                        onClick={() => {
                                                            !loading &&
                                                                showPreview(
                                                                    i,
                                                                    true
                                                                )
                                                        }}
                                                    ></video>
                                                    <div
                                                        className="excluzion_icon"
                                                        onClick={() => {
                                                            !loading &&
                                                                removeFromFiles(
                                                                    i
                                                                )
                                                        }}
                                                    >
                                                        <CloseRoundedIcon className="icon" />
                                                    </div>
                                                    <PlayCircleFilledWhiteIcon className="video_play" />
                                                </div>
                                            )
                                        } else {
                                            let title
                                            if (item.file.name.length > 46)
                                                title = `${item.file.name.substr(0,40)}...${item.file.type.substr(item.file.type.lastIndexOf('/')).replace('/', '.')}`
                                            else title = item.file.name

                                            return (
                                                <div
                                                    className="preview"
                                                    key={i}
                                                    data-index={i}
                                                >
                                                    <img
                                                        src={item?.preview}
                                                        alt={`doc_${item.file.name}_${i}`}
                                                    />
                                                    <span className="doc_name">
                                                        {title}
                                                    </span>
                                                    <div
                                                        className="excluzion_icon"
                                                        onClick={() => {
                                                            !loading &&
                                                                removeFromFiles(
                                                                    i
                                                                )
                                                        }}
                                                    >
                                                        <CloseRoundedIcon className="icon" />
                                                    </div>
                                                </div>
                                            )
                                        }
                                    })}
                                    {files.length > 7 && (
                                        <div
                                            className="remaining"
                                            data-items={JSON.stringify(files)}
                                            onClick={() => {
                                                !loading && showFullPreview()
                                            }}
                                        >
                                            <div className="ammount">
                                                {`+ ${files.length - 7}`}
                                            </div>
                                        </div>
                                    )}
                                    <div
                                        className="upload_more"
                                        onClick={() => {
                                            !loading && inputRef.current.click()
                                        }}
                                    >
                                        <div className="more_icon">
                                            <AddRoundedIcon />
                                        </div>
                                        upload more
                                        <input
                                            ref={inputRef}
                                            type="file"
                                            multiple="multiple"
                                            className="body_file_input"
                                            onChange={handleFiles}
                                            hidden
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div
                                    className="body_file"
                                    ref={bodyFileRef}
                                    onClick={() => {
                                        inputRef.current.click()
                                    }}
                                    onDragOver={(e) => {
                                        e.preventDefault()
                                        bodyFileRef.current.classList.add(
                                            'active'
                                        )
                                    }}
                                    onDragLeave={(e) => {
                                        e.preventDefault()
                                        bodyFileRef.current.classList.remove(
                                            'active'
                                        )
                                    }}
                                    onDrop={onDrop}
                                >
                                    <div>
                                        <h4>Drop files</h4>
                                        <h5> or click here</h5>
                                    </div>
                                    <input
                                        ref={inputRef}
                                        type="file"
                                        multiple="multiple"
                                        className="body_file_input"
                                        onChange={handleFiles}
                                        hidden
                                    />
                                </div>
                            )}
                            {files && files.length > 0 && !loading && (
                                <button
                                    className="options_body_button"
                                    onClick={() => {
                                        checkSize()
                                        
                                    }}
                                >
                                    Upload
                                </button>
                            )}
                            <DotLoader
                                color="#6986A5"
                                loading={loading}
                                size={30}
                            />
                        </div>
                    </>
                )}
            </div>
            {upload && (
                <Upload
                    files={files}
                    folder={folderInputRef?.current ? true : false}
                    setView={setView}
                    setLoading={setLoading}
                    folderName={folderInputRef?.current?.value?? folderInputRef?.current?.value}
                    setUploadStatus={setUploadStatus}
                />
            )}
            {preview && preview.show && (
                <Preview
                    file={preview}
                    setPreview={setPreview}
                    files={files}
                    setFiles={setFiles}
                />
            )}
            {modal && (
                <Modal message={modal} title='Exceeded your limit' setModal={setModal} />
            )}
        </>
    )
}

export default NewsOptions
