import React, { useReducer } from "react";
import projectContext from "./projectContext";
import projectReducer from "./projectReducer";
import { SHOW_FORM_NEW_PROJECT, GET_PROJECTS, ADD_PROJECT, VALIDATE_FORM, CURRENT_PROJECT, DELETE_PROJECT, PROJECT_ERROR } from "../../types";
import { clientAxios } from "../../config/axios";

const ProjectState = (props) => {

  const initialState = {
    projects: [],
    formnewproject: false,
    showerror: false,
    project: null,
    message: null
  };

  const [state, dispatch] = useReducer(projectReducer, initialState);

  const showFormNewProject = () => {
    dispatch({
      type: SHOW_FORM_NEW_PROJECT,
    });
  };

  const getProjects = async () => {
    try {
      const response = await clientAxios.get('/projects')
      dispatch({
        type: GET_PROJECTS,
        payload: response.data.projects,
      });
    } catch (error) {
      const alert = {
        msg: 'Something went wrong',
        category: 'alerta-error'
      }
      dispatch({
        type: PROJECT_ERROR,
        payload: alert
      })
    }
  };

  const addProject = async (project) => {
    try {
      const response = await clientAxios.post('/projects', project)
      dispatch({
        type: ADD_PROJECT,
        payload: response.data
      })
    } catch (error) {
      const alert = {
        msg: 'Something went wrong',
        category: 'alerta-error'
      }
      dispatch({
        type: PROJECT_ERROR,
        payload: alert
      })
    }
  }

  const showError = () => {
    dispatch({
      type: VALIDATE_FORM
    })
  }

  const currentProject = projectId => {
    dispatch({
      type: CURRENT_PROJECT,
      payload: projectId
    })
  }

  const deleteProject = async projectId => {
    try {
      await clientAxios.delete(`/projects/${projectId}`)
      dispatch({
        type: DELETE_PROJECT,
        payload: projectId
      })
    } catch (error) {
      const alert = {
        msg: 'Something went wrong',
        category: 'alerta-error'
      }
      dispatch({
        type: PROJECT_ERROR,
        payload: alert
      })
    }
  }

  return (
    <projectContext.Provider
      value={{
        projects: state.projects,
        formnewproject: state.formnewproject,
        showerror: state.showerror,
        project: state.project,
        message: state.message,
        showFormNewProject,
        getProjects,
        addProject,
        showError,
        currentProject,
        deleteProject
      }}
    >
      {props.children}
    </projectContext.Provider>
  );
};

export default ProjectState;
