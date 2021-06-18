/* eslint-disable import/no-anonymous-default-export */
import { FETCH_MANAGED_PROJECT } from "../actions/managedProject";

const initialState = {
  managedProject: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MANAGED_PROJECT:
      return {
        managedProject: action.managedProject,
      };

    default:
      return state;
  }
};
