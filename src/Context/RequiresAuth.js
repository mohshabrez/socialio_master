import { Navigate, useLocation } from "react-router"
import { UseAuth } from "./AuthContext"

export function RequiresAuth({children}){
    let location = useLocation()
    const {currentUser} = UseAuth()
    return currentUser ? (
        children ) : (
            <Navigate to="/Login" state={{from : location
            }}/>
    )
}