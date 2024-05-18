import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../provider/AuthProvider.jsx";

const ProtectedRoute = ({ children }) => {
    const { state: { isLogged } } = useContext(AuthContext);
    const location = useLocation();

    if (!isLogged) {
        // Si l'utilisateur n'est pas connecté, on le redirige vers la page de connexion.
        return <Navigate to="/login" state={{ from: location.pathname }} />;
    }

    // Sinon, on affiche le composant demandé.
    return children;
}

export default ProtectedRoute;