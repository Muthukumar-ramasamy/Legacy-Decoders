import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { getAuthToken } from "../common/http"

const SecureRoute = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const token = getAuthToken()
        if (!token) {
            navigate("/auth")
        } else {
            navigate("/story-to-syntex")
        }
    }, [])

    return (<Outlet />)
}

export default SecureRoute