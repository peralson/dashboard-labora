import { fetchProjects } from "./projects";

export const HANDLE_APPLICATION = "HANDLE_APPLICATION";

export const handleApplication = (
  projectId,
  offerId,
  applicationId,
  action,
) => {
  return async (dispatch, getState) => {
    // const token = getState().auth.token

    const response = await fetch(
      `https://us-central1-partime-60670.cloudfunctions.net/api/application/${applicationId}?action=${action}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      console.log("Error", response.status);
      const resData = await response.json();
      console.error(resData);
      throw new Error("Ha ocurrido un error al aceptar la aplicación.");
    } else {
      fetchProjects();
    }

    const resData = await response.json();

    console.log(resData);

    dispatch({
      type: HANDLE_APPLICATION,
      projectId,
      offerId,
      applicationId,
      action,
    });
  };
};
