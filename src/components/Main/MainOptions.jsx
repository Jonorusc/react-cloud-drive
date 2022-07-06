import React, { useState } from 'react'
import Menu from './Menu'

function MainOptions() {
    const [dropdown, setDropdown] = useState(0),
        [view, setView] = useState('')

    return (
        <div className="main_options">
            <Menu view={view} setView={setView} dropdown={dropdown} setDropdown={setDropdown} />
        </div>
    )
}

export default MainOptions
