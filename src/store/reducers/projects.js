/* eslint-disable import/no-anonymous-default-export */
import { FETCH_PROJECTS, FETCH_PAST_PROJECTS } from '../actions/projects';

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
    case FETCH_PAST_PROJECTS:
      return {
        ...state,
        pastProjects: action.pastProjects,
      };

    default:
      return state;
  }
};
