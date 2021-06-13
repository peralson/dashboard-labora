/* eslint-disable import/no-anonymous-default-export */
import { FETCH_WORKERS } from '../actions/workers';
import { EDIT_TAGS } from '../actions/tags';

const initialState = {
  allWorkers: [],
};  

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WORKERS:
      return {
        allWorkers: action.workers,
      };
    case EDIT_TAGS:
      console.log('eeeeeeaa')
      return {
        ...state
      }
    default:
      return state;
  }
};
