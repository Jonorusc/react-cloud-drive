import React, { useEffect, useContext, useState } from 'react'
import StorageRoundedIcon from '@mui/icons-material/StorageRounded'
import UserDrive from '../../../helpers/userDrive'
import Firestore from '../../../helpers/Firestore'
import formatBytes from '../../../helpers/formatBytes'
import getPercent from '../../../helpers/getPercent'

import './Storage.css'

function Storage() {
    const { userDrive, setUserDrive } = useContext(UserDrive),
        [storage, setStorage] = useState(0)

    useEffect(() => {
        getStorage()
        setUserDrive({
            ...userDrive,
            storage: {
                capacity: storage.capacity,
                inUse: storage.inUse,
            },
        })
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        getStorage()
        // eslint-disable-next-line
    }, [userDrive])

    async function getStorage() {
        const task = await Firestore('get', userDrive?.user)
        setStorage(task)
    }

    return (
        <div className='storage'>
            <div className="storage_header">
                <StorageRoundedIcon className={getPercent(storage.inUse, storage.capacity) >= 80 ? "storage_header_icon warning" : "storage_header_icon"}  />
                <span className="text">Storage</span>
            </div>
            <div className="storage_body">
                <div className="storage_progress">
                    <div className={getPercent(storage.inUse, storage.capacity) >= 80 ? "storage_progress_bar warning" : "storage_progress_bar"} style={{width: `${getPercent(storage.inUse, storage.capacity)}%`}}></div>
                </div>
                <span className="storage_ammount">{formatBytes(storage.inUse)} of {formatBytes(storage.capacity)}</span>
            </div>
        </div>
    )
}

export default Storage