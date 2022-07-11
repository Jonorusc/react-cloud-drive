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
import UserDrive from '../helpers/userDrive'
import { useSelector } from "react-redux"

function App() {
    
    function Home() {
        const { user } = useSelector((state) => ({ ...state })),
        currentfolder = user?.username ? user?.username : '',
        [hidesidebar, setHideSdebar] = useState(false),
        [userDrive, setUserDrive] = useState({
            user: user?.username,
            currentFolder: [currentfolder],
            isActive: [], 
            currentFile: '',
        })
        return (
            <UserDrive.Provider value={{ userDrive, setUserDrive }}>
                <Header hidesidebar={hidesidebar} setHideSdebar={setHideSdebar} />
                <Aside hidesidebar={hidesidebar} />
                <Main />
            </UserDrive.Provider>
        )
    }

    return (
        <>
            <Routes>
                <Route element={<FreeRoutes/>}>
                    <Route path='/login' element={<Login />} exact />
                </Route>
                <Route element={<LoggedRoutes/>}>
                    <Route path='/' element={<Home />} exact />
                    <Route path='/mydrive' element={<Home />} exact />
                    <Route path='/mydrive/:trash' element={<Home />} exact />
                    <Route path='/profile' element={<Profile />} exact />
                    <Route path='/activate/:token' element={<Activate />} exact />
                </Route>
                <Route path='/forgot' element={<Forgot />} exact />
            </Routes>
        </>
    )
}

export default App