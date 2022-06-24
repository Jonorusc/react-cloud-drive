import React from 'react'
import ArchiveIcon from '@mui/icons-material/Archive'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'

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
                    active={true}
                    to="/"
                />
                <AsideOption
                    Icon={DeleteRoundedIcon}
                    option="Trash"
                    active={false}
                    to="/trash"
                />
            </div>
            <Storage ammout="130mb of 1GB" />
        </aside>
    )
}

export default Aside
