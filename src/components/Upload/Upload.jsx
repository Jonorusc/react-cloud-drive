import React, { useEffect, useContext, useState } from 'react'
// eslint-disable-next-line
import Uploading from '../Uploading/Uploading'
import UserDrive from '../../helpers/userDrive'
import ManageDb from '../../config/ManageDb'
// helpers
import remainingTime from '../../helpers/remainingTime'
// import manageUpload from '../../helpers/manageUpload'

import './Upload.css'

function Upload({ files, folder, setView, folderName, setUploadStatus }) {
    const { userDrive, setUserDrive } = useContext(UserDrive),
        [success, setSucess] = useState(),
        [error, setError] = useState(),
        [uploading, setUploading] = useState([]),
        [uploadingStatus, setUploadingStatus] = useState({}),
        [manageDownload, setManageDownload] = useState([])
    
    useEffect(() => {
        if (folder) createFolder()
        else uploadFiles().then(resps => {
            resps.forEach((resp, i) => {
                takingPromise(resp)
            })
        }).catch(err => {
            setSucess('')
            setError(err.message)
            setUploadingStatus({})
            let temp = [...manageDownload]
            temp.splice(err.index, 1)
            setManageDownload(temp)
        })
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        setUploadingStatus(uploadingStatus)
        switch(uploadingStatus.payload) {
            case 'cancel':
                manageDownload[uploadingStatus.index].upload.cancel()
            break
            case 'pause':
                manageDownload[uploadingStatus.index].upload.pause()
            break
            case 'resume':
                manageDownload[uploadingStatus.index].upload.resume()
            break
            default: break
        }
    }, [uploadingStatus, setUploadingStatus, manageDownload])

    async function createFolder() {
        const manageDb = new ManageDb(userDrive?.user, userDrive?.currentFolder)
        await manageDb.setInUser({
                name: folderName.toString(),
                type: 'folder',
                filepath: userDrive.currentFolder.join('/'),
                excluded: false,
            })
            .then(() => {
                setSucess('A folder has been created successfully!')
                setUploadStatus('success')
                setUserDrive({
                    ...userDrive,
                    refresh: !userDrive?.refresh,
                })
                setTimeout(() => {
                    setView('')
                }, 2000);
            })
            .catch((err) => {
                setError(err)
                setUploadStatus('error')
            })
    }

    async function takingPromise(resp) {
        const manageDb = new ManageDb(userDrive?.user, userDrive?.currentFolder)
        await manageDb.setInUser({
            name: resp.name?.toString(),
            type: resp.type,
            size: resp.size,
            downloadURL: resp.downloadURL,
            storageName: resp.name?.toString(),
            fullPath: userDrive?.currentFolder.join('/'),
            preview: resp.preview,
            contentType: resp.contentType,
            timeCreated: resp.timeCreated,
            updated: resp.updated,
            excluded: false,
        }).then(() => {
            setError('')
            setSucess('Files uploaded successfully')
            setUploadingStatus({})
            setUploadStatus('success')
            let temp = [...manageDownload]
            temp.splice(resp.index, 1)
            setManageDownload(temp)
            setUserDrive({
                ...userDrive,
                refresh: !userDrive?.refresh,
            })
            setTimeout(() => {
                setView('')
            }, 2000)
        }).catch(err => {
            setSucess('')
            setError(err)
            setUploadStatus('error')
            setUploadingStatus({})
            let temp = [...manageDownload]
            temp.splice(resp.index, 1)
            setManageDownload(temp)
        })
    }

    async function uploadFiles() {
        let promises = [], 
            $uploading = [], 
            $uploads = [],
            startedAt = Date.now()

        files.forEach((file, i) => {
            // check upload status
            if(uploadingStatus.payload === 'cancel' && uploadingStatus.index === i) 
                return
                
            promises.push(new Promise((resolve, reject) => {
                const manageDb = new ManageDb(userDrive?.user, userDrive?.currentFolder, file?.file?.name),
                filePreview = file?.file?.type.includes('image') ? file?.preview : 'none',
                upload = manageDb.startUploadBytesResumable(file?.file)
               
                // storing informations
                $uploading.push({on: true, index: i,})
                $uploads.push({upload, index: i})
                setManageDownload($uploads)
                // end storing informations

                upload.on('state_changed', 
                    (snapshot) => {
                        let { remaining, percent } = remainingTime(
                            snapshot.bytesTransferred,
                            snapshot.totalBytes,
                            startedAt
                        )
                        $uploading[i] = {
                            ...$uploading[i],
                            remaining,
                            percent,
                            title: file?.file?.name
                        }
                        setUploading([...$uploading])
                        // switch (snapshot.state) {
                        //     case 'paused':
                        //         console.log('Upload is paused')
                        //         break
                        //     case 'running':
                        //         console.log('Upload is running')
                        //         break
                        //     default: break
                        // }
                    },
                    (err) => {
                        switch (err.code) {
                            case 'storage/canceled':
                                setError('User canceled the upload')
                                setUploadingOff($uploading, i)
                                // setUploadStatus('error')
                                reject({
                                    message: 'Canceled by user', index: i,
                                })
                                setTimeout(() => {
                                    setError('')
                                }, 2000)
                              break
                            case 'storage/unknown':
                                setError('Unknown error occurred')
                                setUploadingOff($uploading, i)
                                reject({
                                    message: 'Unknown error occurred', index: i,
                                })
                                setTimeout(() => {
                                    setError('')
                                }, 2000)
                              break
                            default: break
                        }
                    },
                    () => {
                        manageDb.getDownload($uploads[i].upload.snapshot.ref).then((downloadURL) => {
                            const data = $uploads[i].upload.snapshot.metadata
                            setUploadingOff($uploading, i)
                            resolve({
                                ...data,
                                downloadURL,
                                preview: filePreview,
                                index: i,
                            })
                        })
                    }
                )

            }))
        })
        return Promise.all(promises)
    }

    function setUploadingOff($uploading, i) {
        $uploading[i] = {
            ...$uploading[i],
            on: false,
        }
        setUploading([...$uploading])
    }

    return (
        <>
            {success && <span>{success}</span>}
            {error && <span>{error}</span>}
            {uploading.length > 0 ? (
                <div className="upload_wrapper">
                    {uploading.map((item, i) => {
                        if(item.on) {
                            return (
                                <Uploading
                                    key={i}
                                    relative
                                    title={item?.title}
                                    remaining={item?.remaining}
                                    percent={item?.percent}
                                    uploadingStatus={uploadingStatus}
                                    setUploadingStatus={setUploadingStatus}
                                    i={0}
                                />
                            )
                        }
                        return <React.Fragment key={i}></React.Fragment>
                    })}
                </div>
            ) : (
                <></>
            )}
        </>
    )
}

export default Upload
