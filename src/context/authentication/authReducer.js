import {
    REGISTER_SUCCESS,
    REGISTER_ERROR,
    GET_USER,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT
} from "../../types";


export default function authReducer(state, action) {
    switch (action.type) {
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);

            return {
                ...state,
                authenticated: true,
                message: null,
                loading: false
            }
        case GET_USER:
            return {
                ...state,
                user: action.payload,
                authenticated: true,
                loading: false
            }
        case LOGOUT:
        case LOGIN_ERROR:
        case REGISTER_ERROR:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                message: action.payload,
                authenticated: false,
                user: null,
                loading: false
            }
        default:
            return state;
    }
}