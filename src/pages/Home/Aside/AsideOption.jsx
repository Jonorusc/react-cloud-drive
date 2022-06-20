import React from 'react'
import { Link } from 'react-router-dom'
import './AsideOption.css'

function AsideOptions( {Icon, option, active, to} ) {

    function asideClass() {
        return active === true ? 'aside_options active' : 'aside_options'
    }

    return (
        <Link className={asideClass()} to={ to ? to : '#'}>
            {Icon && <Icon />}
            <span className="option">{option}</span>
        </Link>
    )
}

export default AsideOptions