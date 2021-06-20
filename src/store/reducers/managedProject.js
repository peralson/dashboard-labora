/* eslint-disable import/no-anonymous-default-export */
import {
  FETCH_MANAGED_PROJECT,
  CHANGE_DATE,
  CHANGE_OFFER,
} from "../actions/managedProject";

const initialState = {
  managedProject: {},
  offersArray: [],
  pickedOffer: "",
  datesArray: [],
  pickedDate: "",
  jobs: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MANAGED_PROJECT:
      return {
        ...state,
        managedProject: action.managedProject,
        offersArray: action.offersArray,
        datesArray: action.datesArray,
        pickedDate: action.datesArray[0],
        jobs: action.jobs,
      };

    case CHANGE_OFFER:
      return {
        ...state,
        pickedOffer: action.offer,
      };

    case CHANGE_DATE:
      return {
        ...state,
        pickedDate: action.date,
      };

    default:
      return state;
  }
};
