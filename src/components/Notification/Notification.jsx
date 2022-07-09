import React from 'react'

function Notification({ title, fileName }) {
    let name
    fileName?.length > 15 ? name = `${fileName.substr(0,15)}...` : name = fileName
    return (
        <div className="notification_title">
            {name ? `${name} ${title}` : `${title}`}
        </div>
    )
}

export default Notification