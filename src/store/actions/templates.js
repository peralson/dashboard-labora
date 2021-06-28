export const FETCH_TEMPLATES = 'FETCH_CONTRACT_TEMPLATES';

export const fetchTemplates = () => {
  return async (dispatch, getState) => {
    const token = localStorage.getItem("fbase_key");

    const response = await fetch(
      "https://us-central1-partime-60670.cloudfunctions.net/api/contract/company/templates",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok && response.status === 404)
      return dispatch({ type: FETCH_TEMPLATES, templates: [] });
    if (!response.ok) throw new Error("Ha ocurrido un error.");

    const resData = await response.json();

    let templates = [];

    resData.body.forEach((template) => {
      templates.push(template);
    });

    dispatch({
      type: FETCH_TEMPLATES,
      templates: templates,
    });
  };
};

