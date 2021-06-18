export const FETCH_MANAGED_PROJECT = "FETCH_MANAGED_PROJECT";

export const fetchManagedProject = (projectId) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://us-central1-partime-60670.cloudfunctions.net/api/event/checkStatus/${projectId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const resData = await response.json();

    if (!response.ok && response.status === 404)
      return dispatch({ type: FETCH_MANAGED_PROJECT, projects: {} });
    if (!response.ok) {
      console.error("ERROR", resData);
      throw new Error("Ha ocurrido un error.");
    }

    dispatch({
      type: FETCH_MANAGED_PROJECT,
      managedProject: resData.body,
    });
  };
};
