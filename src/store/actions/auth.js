export const SET_AUTH_DATA = "SET_AUTH_DATA";

export const setAuthData = (idToken) => {
  return async (dispatch) => {
    dispatch({
      type: SET_AUTH_DATA,
      idToken,
    });
  };
};
