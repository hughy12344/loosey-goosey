import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isLoggedIn, children }) => {
    if (isLoggedIn === false) {
        return <Navigate to='/login' replace />
    }

    return children
}

export default ProtectedRoute