export const FETCH_PAYROLLS = 'FETCH_PAYROLLS';

export const fetchPayrolls = () => {
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
    
    let payrolls = [];

    // resData.body.forEach((worker) => {
    //   workers.push({ ...worker, tags: ["Gordo", "Feo"], categories: ["Camarero", "Azafato"]});
    // });

    payrolls = [
      {
        id: 1,
        pdf: 'http://www.africau.edu/images/default/sample.pdf',
        category: 'Limpiador',
        worker: {
          image: 'https://avatars.githubusercontent.com/u/43375266?v=4',
          name: 'Eloy Gomez'
        },
        event: 'Evento de mercedes',
        date: '14 oct 2020',
        hours: 12,
        costs: {
          total: 160,
          salary: 110,
          extraSalary: 20,
          extras: [{
            name: 'Desplazamiento',
            amount: 20
          },{
            name: 'Nocturnidad',
            amount: 10
          }]
        },
        fee: 'Precio por convenio',
        status: 'pending'
      },
      {
        id: 2,
        pdf: 'http://www.africau.edu/images/default/sample.pdf',
        category: 'Limpiador',
        worker: {
          image: 'https://avatars.githubusercontent.com/u/43375266?v=4',
          name: 'Eloy Gomez'
        },
        event: 'Evento de mercedes',
        date: '25 may 2021',
        hours: 12,
        costs: {
          total: 160,
          salary: 110,
          extraSalary: 20,
          extras: [{
            name: 'Desplazamiento',
            amount: 20
          },{
            name: 'Nocturnidad',
            amount: 10
          }]
        },
        fee: 'Precio por convenio',
        status: 'paid'
      },
      {
        id: 3,
        pdf: 'http://www.africau.edu/images/default/sample.pdf',
        category: 'Limpiador',
        worker: {
          image: 'https://avatars.githubusercontent.com/u/43375266?v=4',
          name: 'Eloy Gomez'
        },
        event: 'Evento de mercedes',
        date: '25 may 2021',
        hours: 12,
        costs: {
          total: 160,
          salary: 110,
          extraSalary: 20,
          extras: [{
            name: 'Desplazamiento',
            amount: 20
          },{
            name: 'Nocturnidad',
            amount: 10
          }]
        },
        fee: 'Precio por convenio',
        status: 'pending'
      },
    ]

    dispatch({ 
      type: FETCH_PAYROLLS,
      payrolls: payrolls,
    });
  };
};
