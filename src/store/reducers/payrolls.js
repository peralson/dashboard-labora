/* eslint-disable import/no-anonymous-default-export */
import { FETCH_PAYROLLS } from '../actions/payrolls';

const initialState = {
  payrolls: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PAYROLLS:
      return {
        payrolls: action.payrolls,
      };

    default:
      return state;
  }
};
