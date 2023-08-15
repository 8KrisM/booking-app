import { Navigate } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../UserContext"

function RequireAuth({ children }) {
    const {user} = useContext(UserContext)
  
    return user ? children : <Navigate to={'/login'}/>
  }

export default RequireAuth