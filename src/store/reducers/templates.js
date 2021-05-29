/* eslint-disable import/no-anonymous-default-export */
import {
  FETCH_TEMPLATES,
} from '../actions/templates';

const initialState = {
  templates: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TEMPLATES:
      return {
        templates: action.templates,
      };
    default:
      return state;
  }
};
