import { OCULT_ALERT, SHOW_ALERT } from "../../types";


export default function alertsReducer(state, action) {
    switch (action.type) {
        case SHOW_ALERT:
            return {
                alert: action.payload
            }
        case OCULT_ALERT:
            return {
                alert: null
            }
        default:
            return state;
    }
}