import {
    TASKS_PROJECTS,
    ADD_TASKS,
    VALIDATE_TASK,
    DELETE_TASK,
    CURRENT_TASK,
    UPDATE_TASK
} from '../../types'

export default function tasksReducer(state, action) {

    switch (action.type) {
        case TASKS_PROJECTS:
            return {
                ...state,
                tasksproject: action.payload
            }
        case ADD_TASKS:
            return {
                ...state,
                tasksproject: [action.payload, ...state.tasksproject],
                errortask: false
            }
        case VALIDATE_TASK:
            return {
                ...state,
                errortask: true
            }
        case DELETE_TASK:
            return {
                ...state,
                tasksproject: state.tasksproject.filter(task => task._id !== action.payload)
            }
        case UPDATE_TASK:
            return {
                ...state,
                tasksproject: state.tasksproject.map(task => task._id === action.payload._id ? action.payload : task),
                taskselected: null
            }
        case CURRENT_TASK:
            return {
                ...state,
                taskselected: action.payload
            }
        default:
            return state
    }
}