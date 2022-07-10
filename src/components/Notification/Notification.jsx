import React from 'react'

import './Notifications.css'

function Notification({ title, fileName }) {
    let name
    fileName?.length > 15 ? name = `${fileName.substr(0,15)}...` : name = fileName
    return (
        <div className="app_notifications active">
            <div className="app_notification_title">
                {name ? `${name} ${title}` : `${title}`}
            </div>
        </div>
    )
}

export default Notification