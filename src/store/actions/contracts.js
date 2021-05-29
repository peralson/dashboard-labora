export const FETCH_CONTRACTS = 'FETCH_CONTRACTS';
export const FETCH_CONTRACT_TEMPLATES = 'FETCH_CONTRACT_TEMPLATES';

export const fetchContracts = () => {
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

    let contracts = [];

    // resData.body.forEach((worker) => {
    //   workers.push({ ...worker, tags: ["Gordo", "Feo"], categories: ["Camarero", "Azafato"]});
    // });

    contracts = [
      {
        id: 1,
        pdf: 'pdf',
        category: 'Camarero',
        event: 'Evento de mercedes',
        worker: {
          image: 'https://avatars.githubusercontent.com/u/43375266?v=4',
          name: 'Eloy Gomez',
        },
        date: '25 may 2021',
        hours: 12,
        costs: {
          total: 160,
          salary: 110,
          extraSalary: 20,
          extras: [
            {
              name: 'Desplazamiento',
              amount: 20,
            },
            {
              name: 'Nocturnidad',
              amount: 10,
            },
          ],
        },
        fee: 'Precio por convenio',
        type: 'Eventual por circunstancias de la producción',
        status: 'finished',
      },
      {
        id: 2,
        pdf: 'pdf',
        category: 'Camarero',
        event: 'Boda de Paco',
        worker: {
          image: 'https://avatars.githubusercontent.com/u/43375266?v=4',
          name: 'Eloy Gomez',
        },
        date: '25 may 2021',
        hours: 12,
        costs: {
          total: 160,
          salary: 110,
          extraSalary: 20,
          extras: [
            {
              name: 'Desplazamiento',
              amount: 20,
            },
            {
              name: 'Nocturnidad',
              amount: 10,
            },
          ],
        },
        fee: 'Precio por convenio',
        type: 'Eventual por circunstancias de la producción',
        status: 'pending',
      },
    ];

    dispatch({
      type: FETCH_CONTRACTS,
      contracts: contracts,
    });
  };
};
