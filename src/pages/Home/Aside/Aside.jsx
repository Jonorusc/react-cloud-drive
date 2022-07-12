import React from 'react'
import ArchiveIcon from '@mui/icons-material/Archive'
import RestoreFromTrashRoundedIcon from '@mui/icons-material/RestoreFromTrashRounded'
import User from './User'
import AsideOption from './AsideOption'
import Storage from './Storage'

// redux
import { useSelector } from 'react-redux'

import './Aside.css'

function Aside({ hidesidebar }) {
    const { user } = useSelector((user) => ({ ...user }))

    return (
        <aside className={hidesidebar ? 'active' : ' '}>
            <User name={user?.first_name} picture={user?.picture} />
            <div className="actions">
                <AsideOption
                    Icon={ArchiveIcon}
                    option="My Drive"
                    active={window.location.pathname === '/mydrive' ? true : false}
                    to="/mydrive"
                />
                <AsideOption
                    Icon={RestoreFromTrashRoundedIcon}
                    option="Trash"
                    active={window.location.pathname === '/mydrive/trash' ? true : false}
                    to="/mydrive/trash"
                />
            </div>
            <Storage />
        </aside>
    )
}

export default Aside
