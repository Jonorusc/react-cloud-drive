import React, { useRef } from 'react'

function BreadCrumbs({ userDrive, setUserDrive}) {
    const navigationRef = useRef()
    let path = []
    return (
        <div className="breadcrumbs">
            {userDrive?.currentFolder.length > 1 ? (
                <div className="navigation" ref={navigationRef}>
                    {userDrive?.currentFolder.map((item, i) => {
                        console.log(item, i)
                        path.push(item)
                        return (
                            <React.Fragment key={i}>
                                <div className="link" data-path={path.join('/')}
                                    onClick={() => {
                                        let  newPath = navigationRef?.current?.children[i]?.dataset.path.split('/')
                                        setUserDrive({...userDrive, currentFolder: newPath, currentFile: '',})
                                    }}
                                    >
                                    {item} 
                                </div> 
                                <span className='egt'>&gt;</span>
                            </React.Fragment>
                        )
                    })}
                    {userDrive?.currentFile !== "" && (
                        <span className='link_span'>
                            {userDrive?.currentFile}
                        </span>
                    )}
                </div>
            ) : (
                <div className="navigation">
                    <div className="link">{userDrive?.currentFolder}</div>
                    {userDrive?.currentFile !== "" && (
                        <span className='link_span'>
                           : {userDrive?.currentFile}
                        </span>
                    )}
                </div>
            )}
        </div>
    )
}

export default BreadCrumbs