import { createContext, useEffect, useReducer } from "react"
import { LOGIN, authReducer, initState } from "../reducers/AuthReducer"

const defaultValueType = {
    state: initState,
    dispatch: () => null
}

export const AuthContext = createContext(defaultValueType)

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initState)

    useEffect(() => {
        const user = localStorage.getItem('@user')
        if (user) {
            dispatch({ type: LOGIN, payload: JSON.parse(user) })
        }
    }, [])

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider