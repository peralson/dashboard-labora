export const FETCH_COMPANY = "FETCH_COMPANY";

export const fetchCompany = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.idToken;

    const response = await fetch(
      "https://us-central1-partime-60670.cloudfunctions.net/api/user/company/myCompany",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const resData = await response.json();

    if (!response.ok) {
      console.error("ERROR", resData);
      throw new Error();
    }

    dispatch({
      type: FETCH_COMPANY,
      company: resData.body[0],
    });
  };
};
