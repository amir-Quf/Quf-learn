import useAuthStore from "../store/authStore";
import { Navigate } from "react-router-dom";

const AdminRoute = ({Children}) => {
    const {isAdmin} = useAuthStore()
    return isAdmin ? Children : <Navigate to='/'/>
}

export default AdminRoute