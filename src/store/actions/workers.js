export const FETCH_WORKERS = "FETCH_WORKERS";

export const fetchWorkers = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.idToken;

    const response = await fetch(
      "https://us-central1-partime-60670.cloudfunctions.net/api/listOfWorkers/myWorkers",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok && response.status === 404)
      return dispatch({ type: FETCH_WORKERS, workers: [] });
    if (!response.ok) throw new Error("Ha ocurrido un error.");

    let workers = [];

    const resData = await response.json();

    resData.body.forEach((worker) => {
      workers.push(worker);
    });

    dispatch({
      type: FETCH_WORKERS,
      workers: workers,
    });
  };
};

export const inviteWorker = async ({ categories, tags, expiration }) => {
  return async (dispatch, getState) => {
    const token = getState().auth.idToken;

    const response = await fetch(
      "https://us-central1-partime-60670.cloudfunctions.net/api/listOfWorkers/invite/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Request-Headers": true,
          "Access-Control-Request-Method": "POST",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const resData = await response.json();

    if (!response.ok) {
      console.error(resData);
      throw new Error();
    }

    return resData.body;
  };
};

export const newWorker = async ({ email, password, name }) => {
  return async (dispatch, getState) => {
    const token = getState().auth.idToken;

    const response = await fetch(
      "https://us-central1-partime-60670.cloudfunctions.net/api/auth/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Request-Headers": true,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: email,
          password: password,
          name: name,
        }),
      },
    );

    if (!response.ok) {
      const resData = await response.json();
      console.error(resData);
      throw new Error();
    }
  };
};
