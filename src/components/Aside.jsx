import React from 'react'
import ArchiveIcon from '@mui/icons-material/Archive'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'

import User from './User'
import AsideOption from './AsideOption'
import Storage from './Storage'


import './Aside.css'

function Aside({ hideSidebar }) {

    return (
        <aside className={hideSidebar === true ? 'active' : ' '}>
            <User name='João' />
            <div className="actions">
                <AsideOption Icon={ArchiveIcon} option='My Drive' active={true}/>
                <AsideOption Icon={DeleteRoundedIcon} option='Trash' active={false}/>
            </div>
            <Storage ammout='130mb of 1GB'/>
        </aside>
    )
}

export default Aside