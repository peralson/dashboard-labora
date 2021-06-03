/* eslint-disable import/no-anonymous-default-export */
import {
  FETCH_PROJECTS,
  FETCH_PAST_PROJECTS,
  CREATE_NEW_PROJECT,
  DELETE_PROJECT,
} from "../actions/projects";

const initialState = {
  allProjects: [],
  pastProjects: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROJECTS:
      return {
        ...state,
        allProjects: action.projects,
      };

    case CREATE_NEW_PROJECT:
      const newAllProjects = [...state.allProjects, action.payload];
      return {
        ...state,
        allProjects: newAllProjects,
      };

    case DELETE_PROJECT:
      const deletedAllProjects = state.allProjects.filter(
        (project) => project.id !== action.id,
      );
      return {
        ...state,
        allProjects: deletedAllProjects,
      };

    case FETCH_PAST_PROJECTS:
      return {
        ...state,
        pastProjects: action.pastProjects,
      };

    default:
      return state;
  }
};
