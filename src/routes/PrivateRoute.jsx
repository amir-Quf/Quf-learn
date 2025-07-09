import { Children } from "react";
import useAuthStore from "../store/authStore";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ Children }) => {
    const isLoggedIn = useAuthStore(s => s.isLoggedIn)
    return isLoggedIn ? Children : 
    <Navigate to={'/login'} />
}

export default PrivateRoute