/* eslint-disable import/no-anonymous-default-export */
import sortByDate from "../../lib/sortByDate";
import {
  FETCH_PROJECTS,
  FETCH_PAST_PROJECTS,
  CREATE_NEW_PROJECT,
  DELETE_PROJECT,
  CREATE_PROJECT_OFFER,
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
      const newAllProjects = sortByDate([...state.allProjects, action.payload]);
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

    case CREATE_PROJECT_OFFER:
      const project = state.allProjects.find((p) => p.id === action.projectId);
      project.projectOffers.push({
        id: action.offerId,
        offerData: action.data,
        offerApplications: [],
      });
      return {
        ...state,
      };

    default:
      return state;
  }
};
