import React, { useRef, useState } from 'react'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite'
import folder from '../../images/folder.svg'
import document from '../../images/document.svg'
import pdf from '../../images/pdf.svg'
// components
import Preview from '../Preview/Preview'
// helpers
import useClickOutside from '../../helpers/clickOutside'
import remainingTime from '../../helpers/remainingTime'
import Uploading from '../Uploading/Uploading'

function NewsOptions({ type, setView }) {
    let optionsRef = useRef(),
        inputRef = useRef(),
        bodyFileRef = useRef(),
        gridRef = useRef(),
        [files, setFiles] = useState([]),
        [uploading, setUploading] = useState(false),
        [status, setStatus] = useState({}),
        [preview, setPreview] = useState({})

    useClickOutside(optionsRef, () => {
        if((preview && preview.show) || preview.all)
            return
        setView('')
        setUploading({})
    })

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

    function storeFiles($files) {
        $files.forEach(file => {
            let startedAt
            // filereader
            const reader = new FileReader()
            reader.onloadstart = (e) => {
                startedAt = Date.now()
                setUploading(true)
            }
            reader.onprogress = (e) => {
                if(e.lengthComputable) {
                    let { remaining, percent } = remainingTime(e.loaded, e.total, startedAt)
                    setStatus({remaining, percent})
                }
            }
            reader.onload = (e) => {
                // check if it's an image if yes then store them in preview
                if(file.type.includes('image') || file.type.includes('video')) {
                    setFiles((files) => [...files, {
                        file,
                        preview: e.target.result
                    }])
                } else if(file.type.includes('pdf')) {
                    setFiles((files) => [...files, {
                        file,
                        preview: pdf
                    }])
                } else {
                    setFiles((files) => [...files, {
                        file,
                        preview: document
                    }])
                }
                setUploading(false)
            }
            reader.readAsDataURL(file)
        })
    }

    // showPreview
    function showPreview(ref, index, video = false) {
        setPreview({})
        if(video) {
            const video = files[index]
            setPreview({ preview: video.file, show: true })
            return 
        }
        const file = JSON.parse(ref.current.children[index].dataset.item)
        setPreview({ preview: file.preview, show: true })
    }

    // showAllPreview
    function showFullPreview() {
        setPreview({ files: files, show: true, all: true })
    }
    
    return (
        <div className="new_options">
            <div className="options" ref={optionsRef}>
                <div className="options_header">
                    <span className="text">{type === 'folder' ? 'Create a folder' : 'Upload files'}</span>
                    <div
                        className="close"
                        onClick={() => {
                            setView('')
                        }}
                    >
                        <CloseRoundedIcon />
                    </div>
                </div>
                {type === 'folder' ? (
                    <>
                    <form action="#" className="options_body">
                        <div className="wrap">
                            <img
                                src={folder}
                                alt="folder"
                                className="options_body_icon"
                            />
                            <input
                                type="text"
                                name="folder_name"
                                className="options_body_input"
                                placeholder='Type here'
                            />
                        </div>
                        <button type="submit" className="options_body_button">
                            Create
                        </button>
                    </form>
                    </>
                ) : (
                    <>
                    <form 
                        action="#" 
                        className={files ? 'options_body' : 'options_body align-center row-gap'}
                        encType="multipart/form-data"
                    >
                        {files && files.length ? (
                            <div 
                                className="body_grid" 
                                ref={gridRef}
                            >
                                {files.map((item, i ) => {
                                    if(i < 7) {
                                        if(item.file.type.includes('image')) {
                                            return (
                                                <div 
                                                    className="preview" 
                                                    key={i} 
                                                    data-item={JSON.stringify(item)}
                                                    data-index={i}
                                                    onClick={() => {
                                                        showPreview(gridRef, i)
                                                    }}
                                                >
                                                    <img src={item?.preview} alt={`preview_${i}`} />
                                                </div>
                                            )
                                        } else if(item.file.type.includes('video')) {
                                            return (
                                                <div 
                                                    className="preview" 
                                                    key={i} 
                                                    data-index={i}
                                                    onClick={() => {
                                                        showPreview(gridRef, i, true)
                                                    }}
                                                >
                                                    <video src={item?.preview} muted></video>
                                                    <PlayCircleFilledWhiteIcon className="video_play" />
                                                </div>
                                            )
                                        } else {
                                            let title
                                            if(item.file.name.length > 46)
                                                title = `${item.file.name.substr(0, 40)}...${item.file.type.substr(item.file.type.lastIndexOf('/')).replace('/', '.')}`
                                            else 
                                                title = item.file.name

                                            return (
                                                <div 
                                                    className="preview" 
                                                    key={i} 
                                                    data-item={JSON.stringify(item)}
                                                >
                                                    <img src={item?.preview} alt={`doc_${item.file.name}_${i}`} />
                                                    <span className="doc_name">{title}</span>
                                                </div>
                                            )
                                        }
                                    }
                                    return <React.Fragment key={i}></React.Fragment>
                                })}
                                {files.length > 7 && (
                                    <div 
                                        className="remaining" 
                                        data-items={JSON.stringify(files)}
                                        onClick={() => {
                                            showFullPreview()
                                        }}
                                    >
                                        <div className="ammount">
                                            {`+ ${files.length - 7}`}
                                        </div>
                                    </div>
                                )}
                                <div className="upload_more"
                                    onClick={() => {
                                        inputRef.current.click()
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
                            <div className="body_file"
                                ref={bodyFileRef}
                                onClick={() => {
                                    inputRef.current.click()
                                }}
                                onDragOver={(e) => {
                                    e.preventDefault()
                                    bodyFileRef.current.classList.add('active')
                                }}
                                onDragLeave={(e) => {
                                    e.preventDefault()
                                    bodyFileRef.current.classList.remove('active')
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
                        {files && files.length > 0 && (
                            <button type="submit" className="options_body_button">
                                Upload
                            </button>
                        )}
                    </form>
                    </>
                )}
            </div>
            {uploading && uploading.lenght > 0 && <Uploading remaining={status.remaining} percent={status.percent} />}
            {preview && preview.show && <Preview file={preview} setPreview={setPreview} /> }
        </div>
    )
}

export default NewsOptions
