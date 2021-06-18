/* eslint-disable import/no-anonymous-default-export */
import { FETCH_COMPANY } from "../actions/company";

const initialState = {
  company: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMPANY:
      return {
        company: action.company,
      };

    default:
      return state;
  }
};
