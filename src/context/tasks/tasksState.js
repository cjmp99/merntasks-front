import React, { useReducer } from 'react'
import TasksContext from './tasksContext'
import tasksReducer from './tasksReducer'
import {
    TASKS_PROJECTS,
    ADD_TASKS,
    VALIDATE_TASK,
    DELETE_TASK,
    CURRENT_TASK,
    UPDATE_TASK
} from '../../types'
import { clientAxios } from '../../config/axios';

const TaskState = props => {
    const initialState = {
        tasksproject: [],
        errortask: false,
        taskselected: null
    }

    const [state, dispatch] = useReducer(tasksReducer, initialState)

    const getTasks = async project => {
        try {
            const response = await clientAxios.get('/tasks', { params: { project } })
            dispatch({
                type: TASKS_PROJECTS,
                payload: response.data.tasks
            })
        } catch (error) {
            console.log(error);
        }
    }

    const addTask = async task => {
        try {
            const response = await clientAxios.post('/tasks', task)
            dispatch({
                type: ADD_TASKS,
                payload: response.data.task
            })
        } catch (error) {
            console.log(error);
        }
    }

    const validateTask = () => {
        dispatch({
            type: VALIDATE_TASK
        })
    }

    const deleteTask = async (id, project) => {
        try {

            await clientAxios.delete(`/tasks/${id}`, { params: { project } })

            dispatch({
                type: DELETE_TASK,
                payload: id
            })
        } catch (error) {
            console.log(error);
        }
    }

    const saveCurrentTask = task => {
        dispatch({
            type: CURRENT_TASK,
            payload: task
        })
    }

    const updateTask = async task => {
        try {
            const response = await clientAxios.put(`/tasks/${task._id}`, task);
            dispatch({
                type: UPDATE_TASK,
                payload: response.data.task
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <TasksContext.Provider
            value={{
                tasksproject: state.tasksproject,
                errortask: state.errortask,
                taskselected: state.taskselected,
                getTasks,
                addTask,
                validateTask,
                deleteTask,
                saveCurrentTask,
                updateTask
            }}
        >
            {props.children}
        </TasksContext.Provider>
    )
}

export default TaskState;