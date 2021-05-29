export const FETCH_TEMPLATES = 'FETCH_CONTRACT_TEMPLATES';

export const fetchTemplates = () => {
  return async (dispatch, getState) => {
    // const token = getState().auth.token

    // const response = await fetch(
    //   "https://us-central1-partime-60670.cloudfunctions.net/api/listOfWorkers/myWorkers",
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   },
    // );

    // if (!response.ok && response.status === 404)
    //   return dispatch({ type: FETCH_CONTRACTS, contracts: [] });
    // if (!response.ok) throw new Error("Ha ocurrido un error.");
    
    // const resData = await response.json();
    
    let templates = [];

    // resData.body.forEach((worker) => {
    //   workers.push({ ...worker, tags: ["Gordo", "Feo"], categories: ["Camarero", "Azafato"]});
    // });

    templates = [
      {
        id: 1,
        category: 'Camarero',
        template: 'https://www.seas.es/blog/wp-content/uploads/2014/04/imagen1.jpg',
        type: 'contract'
      },
      {
        id: 2,
        category: 'Limpiador',
        template: 'https://www.seas.es/blog/wp-content/uploads/2014/04/imagen1.jpg',
        type: 'contract'
      },
      {
        id: 3,
        category: 'Azafata',
        template: 'https://www.seas.es/blog/wp-content/uploads/2014/04/imagen1.jpg',
        type: 'contract'
      },
      {
        id: 5,
        category: 'Repartidor',
        template: 'https://www.seas.es/blog/wp-content/uploads/2014/04/imagen1.jpg',
        type: 'contract'
      },
    ]

    dispatch({ 
      type: FETCH_TEMPLATES,
      templates: templates,
    });
  };
};