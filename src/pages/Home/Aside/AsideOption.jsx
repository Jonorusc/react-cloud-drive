import React from 'react'
import './AsideOption.css'

function AsideOptions( {Icon, option, active, to} ) {

    function asideClass() {
        return active === true ? 'aside_options active' : 'aside_options'
    }

    return (
        <a className={asideClass()} href={to ? to : '#'}>
            {Icon && <Icon />}
            <span className="option">{option}</span>
        </a>
    )
}

export default AsideOptions

