import useAuthStore from "../store/authStore";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const getRole = useAuthStore(s => s.getRole)
    return getRole() === "user" ? children : 
    <Navigate to={'/'} />
}

export default PrivateRoute