import React, { useEffect, useContext, useState } from 'react'
// eslint-disable-next-line
import Uploading from '../Uploading/Uploading'
import UserDrive from '../../helpers/userDrive'
import ManageDb from '../../config/ManageDb'


function Upload({ files, folder, setView, setLoading, folderName }) {
    const { userDrive } = useContext(UserDrive),
    [sucess, setSucess] = useState(),
    [error, setError] = useState()
    
    useEffect(() => {
        if(folder) 
            createFolder()
        else 
            uploadFiles()
        // eslint-disable-next-line
    }, [])

    async function createFolder() {
        const manageDb = new ManageDb(userDrive.user, userDrive.currentFolder)
        await manageDb.setInUser({
            name: folderName.toString(),
            type: 'folder',
            filepath: userDrive.currentFolder.join('/')
        }).then(() => {
            setSucess('A folder has been created successfully!')
            setLoading(false)
            setView('')
        }).catch(err => {
            setError(err)
            setLoading(false)
        })
    }

    function uploadFiles() {

    }

    return (
        <>
            <span>{folder && sucess &&  'A folder has been created successfully!'}</span>
            {folder && error && <span>{error}</span>}
            {/* <Uploading title="" remaining='' percent='' /> */}
        </>
    )
}

export default Upload

