/* eslint-disable import/no-anonymous-default-export */
import { FETCH_CATEGORIES } from '../actions/categories';

const initialState = {
  allCategories: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return {
        allCategories: action.categories,
      };

    default:
      return state;
  }
};
