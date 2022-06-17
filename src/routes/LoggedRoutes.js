import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import Login from "../pages/Login/Login"

export default function LoggedRoutes() {
    const { user } = useSelector((state) => ({ ...state }))
    return user ? <Outlet /> : <Login />
}