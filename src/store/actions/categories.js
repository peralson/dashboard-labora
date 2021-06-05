export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';

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

    console.log('categories: ',categories)

    dispatch({ 
      type: FETCH_CATEGORIES,
      categories: categories,
    });
  };
};