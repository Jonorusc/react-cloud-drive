import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from '../pages/Home/Header/Header'
import Aside from '../pages/Home/Aside/Aside'
import MainHeader from '../pages/Home/MainHeader/MainHeader'
import Main from '../pages/Home/Main/Main'
import Uploading from './Uploading/Uploading'
// 
import Login from '../pages/Login/Login'


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
                <Route path='/login' element={<Login />} exact />
            </Routes>
        </>
    )
}

export default App