/* eslint-disable import/no-anonymous-default-export */
import { FETCH_WORKERS } from '../actions/workers'

const initialState = {
  allWorkers: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
    case FETCH_WORKERS:
      return {
        allWorkers: action.workers,
      };

    default:
      return state;
  }
}