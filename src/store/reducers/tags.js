/* eslint-disable import/no-anonymous-default-export */
import { FETCH_TAGS, CREATE_TAGS } from '../actions/tags';

const initialState = {
  allTags: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TAGS:
      return {
        allTags: action.tags,
      };
    case CREATE_TAGS:
      return {...state, allTags: ([...state.allTags, action.tagList])}
    default:
      return state;
  }
};
