import React, { useReducer } from 'react'
import {
    REGISTER_SUCCESS,
    REGISTER_ERROR,
    GET_USER,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT
} from "../../types";
import authReducer from "./authReducer";
import AuthContext from "./authContext";
import { clientAxios } from '../../config/axios';
import { tokenAuth } from '../../config/token';

const AuthState = props => {

    const initialState = {
        token: localStorage.getItem('token'),
        authenticated: null,
        user: null,
        message: null,
        loading: true
    }

    const [state, dispatch] = useReducer(authReducer, initialState)

    const registerUser = async data => {
        try {
            const response = await clientAxios.post('/users', data)
            dispatch({
                type: REGISTER_SUCCESS,
                payload: response.data
            })
            userAuthenticated()
        } catch (error) {
            const alert = {
                msg: error.response.data.msg,
                category: 'alerta-error'
            }
            dispatch({
                type: REGISTER_ERROR,
                payload: alert
            })
        }
    }

    const userAuthenticated = async () => {
        const token = localStorage.getItem('token');

        if (token) {
            tokenAuth(token)
        }

        try {
            const response = await clientAxios.get('/auth');
            dispatch({
                type: GET_USER,
                payload: response.data.user
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: LOGIN_ERROR
            })
        }
    }

    const login = async data => {
        try {
            const response = await clientAxios.post('/auth', data);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: response.data
            })
            userAuthenticated()
        } catch (error) {
            const alert = {
                msg: error.response.data.msg,
                category: 'alerta-error'
            }
            dispatch({
                type: LOGIN_ERROR,
                payload: alert
            })
        }
    }

    const logout = async () => {
        dispatch({
            type: LOGOUT
        })
    }

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                authenticated: state.authenticated,
                user: state.user,
                message: state.message,
                loading: state.loading,
                registerUser,
                login,
                userAuthenticated,
                logout
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;