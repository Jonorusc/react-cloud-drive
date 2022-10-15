import React, { useRef } from 'react'

function BreadCrumbs({ userDrive, setUserDrive, url }) {
    const navigationRef = useRef()
    let path = []
    const RenderJSX = () => {
        if (userDrive?.currentFolder?.length > 1) {
            return (
                <div className="navigation" ref={navigationRef}>
                    {userDrive?.currentFolder.map((item, i) => {
                        path.push(item)
                        return (
                            <React.Fragment key={i}>
                                <div
                                    className="link"
                                    data-path={path.join('/')}
                                    onClick={(e) => {
                                        setUserDrive({
                                            ...userDrive,
                                            currentFolder: e.target.dataset.path.split('/'),
                                            currentFile: '',
                                        })
                                    }}
                                >
                                    {item}
                                </div>
                                <span className="egt">&gt;</span>
                            </React.Fragment>
                        )
                    })}
                    {userDrive?.currentFile !== '' && <span className="link_span">{userDrive?.currentFile}</span>}
                </div>
            )
        } else {
            return (
                <div className="navigation">
                    <div className="link">{userDrive?.currentFolder}</div>
                    {userDrive?.currentFile !== '' && <span className="link_span">: {userDrive?.currentFile}</span>}
                </div>
            )
        }
    }
    return (
        <div className={`breadcrumbs ${url === 'trash' ? 'trash' : ''}`}>
            <RenderJSX />
        </div>
    )
}

export default BreadCrumbs
