// Layout.jsx
import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";
import '../assets/navbar.css'; // Importez le fichier CSS
import { Fragment, useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { LOGOUT } from "../reducers/AuthReducer";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import logo from '../assets/dailyflatlogo.png';

const Layout = () => {
    const { state, dispatch } = useContext(AuthContext);

    const onLogout = async () => {
        await signOut(auth)
            .then(() => {
                localStorage.removeItem('@user');
                dispatch({ type: LOGOUT });
            })
            .catch(error => console.log('SignOut error ->', error));
    };

    return (
        <>
        <nav>
            <NavLink to='/'>
                <img src={logo} alt="Logo DailyFlat" className="logo" />
            </NavLink>
            <NavLink to='/MealSearchPagination'>Recherche</NavLink>
            <NavLink to='/todos'>Ma liste</NavLink>
            {state.isLogged ? (
                <Fragment>
                    <NavLink to='/settings'>Information</NavLink>
                    <button onClick={onLogout}>Déconnexion</button>
                </Fragment>
            ) : (
                <Fragment>
                    <NavLink to='/login'>Connexion</NavLink>
                </Fragment>
            )}
        </nav>
        <Outlet />
        </>
    );
};

export default Layout;
