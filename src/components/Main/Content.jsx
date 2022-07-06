import React, { useEffect, useContext, useState } from 'react'
import ContentItem from './ContentItem'
import UserDrive from '../../helpers/userDrive'
import ManageDb from '../../config/ManageDb'
import DotLoader from 'react-spinners/DotLoader'
import folder from '../../images/folder.svg'
import video from '../../images/video.svg'
import document from '../../images/document.svg'
import pdf from '../../images/pdf.svg'


function Content() {
    const { userDrive, setUserDrive } = useContext(UserDrive),
        [folderListener, setFolderListener] = useState([]),
        [loading, setLoading] = useState(true)
 
    useEffect(() => {
        // storing the lastfolder
        setUserDrive({
            ...userDrive,
            isActive: [],
            lastFolder: userDrive?.currentFolder.join('/'),
        })
        // getting firebase data and storing in folderListener
        readFiles()
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

    async function readFiles() {
        let tempData = []
        const manageDb = new ManageDb(userDrive?.user, userDrive?.currentFolder)
        await manageDb.read((snapshot) => {
            snapshot.forEach(item => {
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
    
    return (
        <div className="content">
            {folderListener?.length > 0 ? (
                <>
                    {folderListener?.map((item, i) => {
                        let title, preview
                        if (item?.data?.name.length > 46)
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
                                <ContentItem title={title} preview={preview} itemKey={item?.key} item={item} index={i} active={userDrive?.isActive.indexOf(item.key) !== -1 ? true: false} />
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
        </div>
    )
}

export default Content