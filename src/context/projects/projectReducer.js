import { SHOW_FORM_NEW_PROJECT, GET_PROJECTS, ADD_PROJECT, VALIDATE_FORM, CURRENT_PROJECT, DELETE_PROJECT, PROJECT_ERROR } from "../../types";

export default function projectReducer (state, action) {
  switch (action.type) {
    case SHOW_FORM_NEW_PROJECT:
      return {
        ...state,
        formnewproject: true,
      };
    case GET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
      };
    case ADD_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload],
        formnewproject: false,
        showerror: false
      }
    case VALIDATE_FORM:
      return {
        ...state,
        showerror: true
      }
    case CURRENT_PROJECT:
      return {
        ...state,
        project: state.projects.filter(project => project._id === action.payload)
      }
    case DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(project => project._id !== action.payload),
        project: null
      }
    case PROJECT_ERROR:
      return {
        ...state,
        message: action.payload
      }
    default:
      return state;
  }
};
