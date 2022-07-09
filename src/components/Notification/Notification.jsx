import React from 'react'

import './Notifications.css'

function Notification({ title, fileName }) {
    let name
    fileName?.length > 15 ? name = `${fileName.substr(0,15)}...` : name = fileName
    return (
        <div className="notifications active">
            <div className="notification_title">
                {name ? `${name} ${title}` : `${title}`}
            </div>
        </div>
    )
}

export default Notification