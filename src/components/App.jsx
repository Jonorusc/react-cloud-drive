import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from '../pages/Header/Header'
import Aside from '../pages/Aside/Aside'
import MainHeader from '../pages/MainHeader/MainHeader'
import Main from '../pages/Main/Main'
import Uploading from './Uploading/Uploading'


function App() {
    const [hidesidebar, setHideSdebar] = useState(false)

    function hideSidebar(action = false) {
        setHideSdebar(action)
    }

    function Home() {
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

    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} exact />
            </Routes>
        </>
    )
}

export default App