/* eslint-disable import/no-anonymous-default-export */
import {
  FETCH_CONTRACTS,
  FETCH_CONTRACT_TEMPLATES,
} from '../actions/contracts';

const initialState = {
  contracts: [],
  contractTemplates: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CONTRACTS:
      return {
        contracts: action.contracts,
      };
    case FETCH_CONTRACT_TEMPLATES:
      return{
        contractTemplates: action.contractTemplates,
      }
    default:
      return state;
  }
};
