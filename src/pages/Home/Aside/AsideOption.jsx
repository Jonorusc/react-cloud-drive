import React from 'react'

import './AsideOption.css'

function AsideOptions( {Icon, option, active} ) {

    function asideClass() {
        return active === true ? 'aside_options active' : 'aside_options'
    }

    return (
        <div className={asideClass()} onClick={() => {console.log('action')}}>
            {Icon && <Icon />}
            <span className="option">{option}</span>
        </div>
    )
}

export default AsideOptions