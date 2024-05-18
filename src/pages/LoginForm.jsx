import { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';
import { LOGIN } from '../reducers/AuthReducer';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import '../assets/LoginForm.css';

const LoginForm = () => {
    const { dispatch } = useContext(AuthContext);
    const { state } = useLocation();
    const navigate = useNavigate();

    const [emailLogin, setEmailLogin] = useState('');
    const [passwordLogin, setPasswordLogin] = useState('');

    const [emailSignup, setEmailSignup] = useState('');
    const [passwordSignup, setPasswordSignup] = useState('');
    const [passwordConfirmSignup, setPasswordConfirmSignup] = useState('');

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleInputChange = ({ target }) => {
        const { name, value } = target;
        if (name === 'emailLogin') setEmailLogin(value);
        if (name === 'passwordLogin') setPasswordLogin(value);
        if (name === 'emailSignup') setEmailSignup(value);
        if (name === 'passwordSignup') setPasswordSignup(value);
        if (name === 'passwordConfirmSignup') setPasswordConfirmSignup(value);
    };

    const handleLogin = async () => {
        setError(null);
        setLoading(true);

        try {
            const userResponse = await signInWithEmailAndPassword(auth, emailLogin, passwordLogin);
            if (userResponse.user) {
                dispatch({ type: LOGIN, payload: userResponse.user });
                localStorage.setItem('@user', JSON.stringify(userResponse.user));
                navigate(state?.from ? state.from : '/');
            }
        } catch (error) {
            handleAuthError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSignup = async () => {
        setError(null);
        setLoading(true);

        try {
            const newUser = await createUserWithEmailAndPassword(auth, emailSignup, passwordSignup);
            if (newUser.user) {
                navigate('/login');
            }
        } catch (error) {
            handleAuthError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleAuthError = (error) => {
        const errorCode = error.code;

        if (errorCode === 'auth/wrong-password') {
            setError('Le mot de passe est invalide');
        } else if (errorCode === 'auth/user-not-found') {
            setError('L\'email est invalide');
        } else if (errorCode === 'auth/weak-password') {
            setError('Le mot de passe doit faire au minimum 6 caractères');
        } else if (errorCode === 'auth/email-already-in-use') {
            setError('L\'email est déjà utilisé');
        } else {
            setError('Une erreur est survenue');
        }
    };

    const switchers = [...document.querySelectorAll('.switcher')];

    switchers.forEach(item => {
        item.addEventListener('click', function () {
            switchers.forEach(item => item.parentElement.classList.remove('is-active'));
            this.parentElement.classList.add('is-active');
        });
    });

    return (
        <div>
            <section className="forms-section">
                <div className="forms">
                    <div className="form-wrapper is-active">
                        <button type="button" className="switcher switcher-login">
                            Login
                            <span className="underline"></span>
                        </button>
                        <form className="form form-login">
                            <fieldset>
                                <legend>Please, enter your email and password for login.</legend>
                                <div className="input-block">
                                    <label htmlFor="emailLogin">E-mail</label>
                                    <input
                                        type="email"
                                        id="emailLogin"
                                        name="emailLogin"
                                        value={emailLogin}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="input-block">
                                    <label htmlFor="passwordLogin">Password</label>
                                    <input
                                        type="password"
                                        id="passwordLogin"
                                        name="passwordLogin"
                                        value={passwordLogin}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </fieldset>
                            <button
                                type="submit"
                                className="btn"
                                onClick={handleLogin}
                                disabled={emailLogin === '' || passwordLogin === '' || loading}
                            >
                                {loading ? 'Loading...' : 'Login'}
                            </button>
                        </form>
                    </div>
                    <div className="form-wrapper">
                        <button type="button" className="switcher switcher-signup">
                            Sign Up
                            <span className="underline"></span>
                        </button>
                        <form className="form form-signup">
                            <fieldset>
                                <legend>Please, enter your email, password, and password confirmation for sign up.</legend>
                                <div className="input-block">
                                    <label htmlFor="emailSignup">E-mail</label>
                                    <input
                                        type="email"
                                        id="emailSignup"
                                        name="emailSignup"
                                        value={emailSignup}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="input-block">
                                    <label htmlFor="passwordSignup">Password</label>
                                    <input
                                        type="password"
                                        id="passwordSignup"
                                        name="passwordSignup"
                                        value={passwordSignup}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="input-block">
                                    <label htmlFor="passwordConfirmSignup">Confirm password</label>
                                    <input
                                        type="password"
                                        id="passwordConfirmSignup"
                                        name="passwordConfirmSignup"
                                        value={passwordConfirmSignup}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </fieldset>
                            <button
                                type="submit"
                                className="btn"
                                onClick={handleSignup}
                                disabled={
                                    emailSignup === '' ||
                                    passwordSignup === '' ||
                                    passwordConfirmSignup === '' ||
                                    loading
                                }
                            >
                                {loading ? 'Loading...' : 'Register'}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LoginForm;
