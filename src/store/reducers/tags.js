/* eslint-disable import/no-anonymous-default-export */
import { FETCH_TAGS } from '../actions/tags';

const initialState = {
  allTags: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TAGS:
      return {
        allTags: action.tags,
      };
    default:
      return state;
  }
};
