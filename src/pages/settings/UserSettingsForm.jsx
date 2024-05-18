// UserSettingsForm.jsx

import { useContext, useState } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import { LOGOUT, SET_LOADING, UPDATE_USER_INFOS } from '../../reducers/AuthReducer';
import '../../assets/Settings/UserSettingsForm.css';

const UserSettingsForm = () => {
    const { state, dispatch } = useContext(AuthContext);
    const { userInfos } = state;

    const [email, setEmail] = useState(userInfos.email);
    const [password, setPassword] = useState(userInfos.password);

    const onSubmit = () => {
        dispatch({ type: SET_LOADING });

        setTimeout(() => {
            dispatch({
                type: UPDATE_USER_INFOS,
                payload: { email, password },
            });
        }, 2000);
    };

    return (
        <div className="settings-container">
            <h1>User Settings Form</h1>
            <button onClick={() => dispatch({ type: LOGOUT })}>Logout</button>
            <div>
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div> 
                <label>Password</label> <input type="password" value={password} onChange={e => setPassword(e.target.value)}/> 
                <button onClick={onSubmit} className="edit-button">
                    Edit
                </button>
            </div>
        </div>
    );
};

export default UserSettingsForm;
