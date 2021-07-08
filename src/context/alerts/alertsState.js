import React, { useReducer } from 'react'
import { OCULT_ALERT, SHOW_ALERT } from "../../types";
import alertsReducer from "./alertsReducer";
import alertsContext from "./alertsContext";

const AlertState = props => {

    const initialState = {
        alert: null
    }

    const [state, dispatch] = useReducer(alertsReducer, initialState)

    const showAlert = (msg, category) => {
        dispatch({
            type: SHOW_ALERT,
            payload: { msg, category }
        })

        setTimeout(() => {
            dispatch({
                type: OCULT_ALERT
            })
        }, 5000);
    }

    return(
        <alertsContext.Provider
            value={{
                alert: state.alert,
                showAlert
            }}
        >
            {props.children}
        </alertsContext.Provider>
    )
}

export default AlertState;