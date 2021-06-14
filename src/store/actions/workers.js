export const FETCH_WORKERS = 'FETCH_WORKERS';

export const fetchWorkers = () => {
  return async (dispatch, getState) => {
    // const token = getState().auth.token

    const response = await fetch(
      'https://us-central1-partime-60670.cloudfunctions.net/api/listOfWorkers/myWorkers',
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok && response.status === 404)
      return dispatch({ type: FETCH_WORKERS, workers: [] });
    if (!response.ok) throw new Error('Ha ocurrido un error.');

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

export const newWorker = async ({ email, password, name }) => {
  // const token = getState().auth.token

  const response = await fetch(
    "https://us-central1-partime-60670.cloudfunctions.net/api/auth/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Request-Headers": true,
      },
      body: {
        email: email,
        password: password,
        name: name,
      },
    },
  );
  
  const resData = await response.json();

  console.log('newworker:', resData)
};
