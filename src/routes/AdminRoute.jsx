import useAuthStore from "../store/authStore";
import { Navigate } from "react-router-dom";

const AdminRoute = ({children}) => {
    const {isAdmin} = useAuthStore()
    return isAdmin() ? children : <Navigate to='/'/>
}

export default AdminRoute