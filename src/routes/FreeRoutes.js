import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

export default function FreeRoutes() {
    const { user } = useSelector((state) => ({ ...state }))
    return user ? <Navigate to="/mydrive" /> : <Outlet />
}