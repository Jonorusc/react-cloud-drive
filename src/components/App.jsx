import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from '../pages/Home/Header/Header'
import Aside from '../pages/Home/Aside/Aside'
import Activate from '../pages/Activate/Activate'
import Login from '../pages/Login/Login'
import LoggedRoutes from '../routes/LoggedRoutes'
import FreeRoutes from '../routes/FreeRoutes'
import Profile from '../pages/Profile/Profile'
import Forgot from '../pages/Forgot/Forgot'
import Main from '../pages/Main/Main'

function App() {
    const [hidesidebar, setHideSdebar] = useState(false)

    function Home() {
        return (
            <>
                <Header hidesidebar={hidesidebar} setHideSdebar={setHideSdebar} />
                <Aside hidesidebar={hidesidebar} />
                <Main />
            </>
        )
    }

    return (
        <>
            <Routes>
                <Route element={<FreeRoutes/>}>
                    <Route path='/login' element={<Login />} exact />
                </Route>
                <Route element={<LoggedRoutes/>}>
                    <Route path='/profile' element={<Profile />} exact />
                    <Route path='/activate/:token' element={<Activate />} exact />
                </Route>
                <Route path='/' element={<Home />} exact />

                <Route path='/forgot' element={<Forgot />} exact />
            </Routes>
        </>
    )
}

export default App