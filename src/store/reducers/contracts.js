/* eslint-disable import/no-anonymous-default-export */
import { FETCH_CONTRACTS } from '../actions/contracts';

const initialState = {
  contracts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CONTRACTS:
      return {
        contracts: action.contracts,
      };

    default:
      return state;
  }
};
