import React, { useState } from 'react'
import Header from './Header'
import Aside from './Aside'
import MainHeader from './MainHeader'
import Main from './Main'
import Uploading from './Uploading'


function App() {
    const [hidesidebar, setHideSdebar] = useState(false)

    function hideSidebar(action = false) {
        setHideSdebar(action)
    }

    return (
        <>
            <Header hideAside={hideSidebar} />
            <Aside hideSidebar={hidesidebar} />
            <MainHeader />
            <Main />
            <Uploading visible={true}/>
        </>
    )
}

export default App