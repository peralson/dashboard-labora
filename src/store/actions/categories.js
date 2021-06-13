export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const EDIT_CATEGORIES = 'EDIT_CATEGORIES';

export const fetchCategories = () => {
  return async (dispatch, getState) => {
    // const token = getState().auth.token

    const response = await fetch(
      "https://us-central1-partime-60670.cloudfunctions.net/api/listOfWorkers/categories",
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok && response.status === 404)
      return dispatch({ type: FETCH_CATEGORIES, categories: [] });
    if (!response.ok) throw new Error("Ha ocurrido un error.");

    let categories = [];

    const resData = await response.json();

    resData.body.forEach((category) => {
      categories.push(category);
    });

    dispatch({ 
      type: FETCH_CATEGORIES,
      categories: categories,
    });
  };
};

export const editCategories = (action, userList, categoryList) => {
  return async (dispatch, getState) => {
    // const token = getState().auth.token

    const response = await fetch(
      `https://us-central1-partime-60670.cloudfunctions.net/api/listOfWorkers/categories/edit/${action}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Request-Method": "PUT",
          "Access-Control-Request-Headers": true,
        },
        body: JSON.stringify({
          categories: categoryList,
          users: userList,
        }),
      },
    );

    if (!response.ok) {
      console.log("ERROR");
      const resData = await response.json();
      console.error(resData);
      throw new Error('Ha ocurrido un error.')
    };

    dispatch({
      type: EDIT_CATEGORIES,
      payload: {
        action: action,
        userList: userList,
        categoryList: categoryList
      }
    });
  };
};
