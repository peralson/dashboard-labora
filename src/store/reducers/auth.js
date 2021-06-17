import { SET_AUTH_DATA } from "../actions/auth";

const initialState = {
  idToken: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_DATA: 
      return {
        idToken: action.idToken,
      }

    default:
      return state;
  }
};
