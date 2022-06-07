import React from 'react'
// images
import folder from '../images/folder.svg'
import doc from '../images/document.svg'
import video from '../images/video.svg'
import image from '../images/image.svg'
import pdf from '../images/pdf.svg'

import './MainContent.css'

const breadcrumb = <span className='main_breadcrumb'>
        <a href="mydrive">My Drive</a> &gt; 
        <a href="photos">Photos</a> &gt; 
        document.txt
</span> 

function ContentItem({ img, title, active }) {
    return (
        <div className={active ? 'files active' : 'files'} 
            id={`folder_${title}`
            }>
            <div className="file">
                <img src={img} 
                    className="file_icon" 
                    alt={title}
                />
            </div>
            <span className="file_name">{title}</span>
        </div>
    )
}

function MainContent() {
    return (
        <div className='main_content'>
            <small>{breadcrumb}</small>
            <div className="content">
                <ContentItem img={folder} title="folder"/>
                <ContentItem img={doc} title="document.txt" active={true}/>
                <ContentItem img={video} title="video.mp4"/>
                <ContentItem img={image} title="image.jpeg"/>
                <ContentItem img={pdf} title="document.pdf"/>
                <ContentItem img={folder} title="folder"/>
                <ContentItem img={doc} title="document"/>
                <ContentItem img={video} title="video.mp4"/>
                <ContentItem img={image} title="image.jpeg"/>
                <ContentItem img={pdf} title="document.pdf"/>
                <ContentItem img={folder} title="folder"/>
                <ContentItem img={doc} title="document"/>
                <ContentItem img={video} title="video.mp4"/>
                <ContentItem img={image} title="image.jpeg"/>
                <ContentItem img={pdf} title="document.pdf"/>
                <ContentItem img={folder} title="folder"/>
                <ContentItem img={doc} title="document"/>
                <ContentItem img={video} title="video.mp4"/>
                <ContentItem img={image} title="image.jpeg"/>
                <ContentItem img={pdf} title="document.pdf"/>
                <ContentItem img={folder} title="folder"/>
                <ContentItem img={doc} title="document"/>
                <ContentItem img={video} title="video.mp4"/>
                <ContentItem img={image} title="image.jpeg"/>
                <ContentItem img={pdf} title="document.pdf"/>
                <ContentItem img={folder} title="folder"/>
                <ContentItem img={doc} title="document"/>
                <ContentItem img={video} title="video.mp4"/>
                <ContentItem img={image} title="image.jpeg"/>
                <ContentItem img={pdf} title="document.pdf"/>
                <ContentItem img={folder} title="folder"/>
                <ContentItem img={doc} title="document"/>
                <ContentItem img={video} title="video.mp4"/>
                <ContentItem img={image} title="image.jpeg"/>
                <ContentItem img={pdf} title="document.pdf"/>
                <ContentItem img={folder} title="folder"/>
                <ContentItem img={doc} title="document"/>
                <ContentItem img={video} title="video.mp4"/>
                <ContentItem img={image} title="image.jpeg"/>
                <ContentItem img={pdf} title="document.pdf"/>
            </div>
        </div>
    )
}

export default MainContent