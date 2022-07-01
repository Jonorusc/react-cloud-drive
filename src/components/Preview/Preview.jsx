import React, { useRef } from 'react'
import useClickOutside from '../../helpers/clickOutside'

import './Preview.css'

function Preview({ file, setPreview }) {
    const previewRef = useRef()

    useClickOutside(previewRef, () => {
        setPreview({})
    })

    return (
        <div id='preview'>
            {file.all ? (
                <>
                    <div className='preview_showall' ref={previewRef}>
                        <div className="wrapper">
                            {file?.files.map((files, i) => {
                                if(files?.file?.type.includes('video')) {
                                    return (
                                        <div className='preview_image_item' key={i}>
                                            <video src={URL.createObjectURL(files?.file)} muted controls></video>
                                        </div>
                                    )
                                } else if (files?.file?.type.includes('image')) {
                                    return (
                                        <div className='preview_image_item' key={i}>
                                            <img src={files.preview} alt={`item${i}`} />
                                        </div>
                                    )
                                }
                                return <React.Fragment key={i}></React.Fragment>
                            })}
                        </div>
                        <h2>Archives</h2>
                        <div className="archives">
                            {file?.files.map((files, i) => {
                                if(!files?.file?.type.includes('video') && !files?.file?.type.includes('image')) {
                                    let title
                                    if(files.file.name.length > 46)
                                        title = `${files.file.name.substr(0, 40)}...${files.file.type.substr(files.file.type.lastIndexOf('/')).replace('/', '.')}`
                                    else 
                                        title = files.file.name
                                    return (
                                        <div className='archive' key={i}>
                                            <img src={files.preview} alt={`item${i}`} />
                                            <span className="title">{title}</span>
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
                    {file?.preview?.type && <video src={URL.createObjectURL(file.preview)} controls autoPlay></video>}
                    {file?.preview && !file.preview?.type && <img src={file.preview} alt="item" />}
                </div>
                </>
            )}
        </div>
    )
}

export default Preview