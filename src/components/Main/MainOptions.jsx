import React, { useState } from 'react'
import Menu from './Menu'

function MainOptions({ url }) {
    const [dropdown, setDropdown] = useState(0),
        [view, setView] = useState('')

    return (
        <div className="main_options">
            <Menu view={view} setView={setView} dropdown={dropdown} setDropdown={setDropdown} url={url}/>
        </div>
    )
}

export default MainOptions
