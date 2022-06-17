import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from '../pages/Home/Header/Header'
import Aside from '../pages/Home/Aside/Aside'
import MainHeader from '../pages/Home/MainHeader/MainHeader'
import Main from '../pages/Home/Main/Main'
import Uploading from './Uploading/Uploading'
// 
import Login from '../pages/Login/Login'
import LoggedRoutes from '../routes/LoggedRoutes'
import FreeRoutes from '../routes/FreeRoutes'


function App() {
    const [hidesidebar, setHideSdebar] = useState(false)

    function Home() {
        return (
            <>
                <Header hidesidebar={hidesidebar} setHideSdebar={setHideSdebar} />
                <Aside hidesidebar={hidesidebar} />
                <MainHeader />
                <Main />
                <Uploading visible={true}/>
            </>
        )
    }

    return (
        <>
            <Routes>
                {/* FREE ROUTES */}
                <Route element={<FreeRoutes/>}>
                    <Route path='/login' element={<Login />} exact />
                </Route>
                {/* LOGGED ROUTES */}
                <Route element={<LoggedRoutes/>}>
                    <Route path='/' element={<Home />} exact />
                </Route>
            </Routes>
        </>
    )
}

export default App