import React, { useRef } from 'react'
import useClickOutside from '../../helpers/clickOutside'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'

import './Preview.css'

function Preview({ file, setPreview, files, setFiles }) {
    const previewRef = useRef()

    useClickOutside(previewRef, () => {
        setPreview({})
    })

    // remove files from files
    function removeFromFiles(index) {
        files.splice(index,1)
        setFiles(files => [...files])
    }

    return (
        <div id='preview'>
            {file.all ? (
                <>
                    <div className='preview_showall' ref={previewRef}>
                        <div className="wrapper">
                            {files.map((item, i) => {
                                if(item?.file?.type.includes('video')) {
                                    return (
                                        <div className='preview_image_item' key={i}>
                                            <video src={URL.createObjectURL(item?.file?? item.file)} muted controls></video>
                                            <div className="excluzion_icon"
                                                onClick={() => {
                                                    removeFromFiles(i)
                                                }}
                                            >
                                                <CloseRoundedIcon className="icon"/>
                                            </div>
                                        </div>
                                    )
                                } else if (item?.file?.type.includes('image')) {
                                    return (
                                        <div className='preview_image_item' key={i}>
                                            <img src={item?.preview} alt={`item${i}`} />
                                            <div className="excluzion_icon"
                                                onClick={() => {
                                                    removeFromFiles(i)
                                                }}
                                            >
                                                <CloseRoundedIcon className="icon"/>
                                            </div>
                                        </div>
                                    )
                                }
                                return <React.Fragment key={i}></React.Fragment>
                            })}
                        </div>
                        <h2>Archives</h2>
                        <div className="archives">
                            {files.map((item, i) => {
                                if(!item?.file?.type.includes('video') && !item?.file?.type.includes('image')) {
                                    let title
                                    if(item.file.name.length > 46)
                                        title = `${item?.file?.name.substr(0, 40)}...${item?.file?.type.substr(item?.file?.type.lastIndexOf('/')).replace('/', '.')}`
                                    else 
                                        title = item?.file?.name
                                    return (
                                        <div className='archive' key={i}>
                                            <img src={item?.preview} alt={`item${i}`} />
                                            <span className="title">{title}</span>
                                            <div className="excluzion_icon"
                                                onClick={() => {
                                                    removeFromFiles(i)
                                                }}
                                            >
                                                <CloseRoundedIcon className="icon"/>
                                            </div>
                                        </div>
                                    )
                                }
                                return <React.Fragment key={i}></React.Fragment>
                            })}
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="preview_image" ref={previewRef}>
                        {/* from content */}
                        {file?.preview && !file?.ObjectURL && <video src={file.preview} controls autoPlay></video>}
                        
                        {file?.preview?.type && file?.ObjectURL && <video src={URL.createObjectURL(file.preview)} controls autoPlay></video>}
                        {file?.preview && file?.ObjectURL && !file?.preview?.type && <img src={file.preview} alt="item" />}
                    </div>
                </>
            )}
        </div>
    )
}

export default Preview