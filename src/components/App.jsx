import React, { useState } from 'react'
import Header from './Header'
import Aside from './Aside'
import Main from './Main'

function App() {
    const [hidesidebar, setHideSdebar] = useState(false)

    function hideSidebar(action = false) {
        setHideSdebar(action)
    }

    return (
        <>
            <Header hideAside={hideSidebar} />
            <Aside hideSidebar={hidesidebar} />
            <Main />
        </>
    )
}

export default App