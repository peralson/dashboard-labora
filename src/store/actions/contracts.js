export const FETCH_CONTRACTS = 'FETCH_CONTRACTS';

export const fetchAllContracts = () => {
  return async (dispatch, getState) => {
    // const token = getState().auth.token

    const response = await fetch(
      'https://us-central1-partime-60670.cloudfunctions.net/api/contract/company',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // if (!response.ok && response.status === 404)
    //   return dispatch({ type: FETCH_CONTRACTS, contracts: [] });
    // if (!response.ok) throw new Error("Ha ocurrido un error.");

    const resData = await response.json();

    console.log('red', resData);

    let contracts = [];

    // resData.body.forEach((contract) => {
    //   contracts.push(contract);
    // });

    contracts = [
      {
        id: 1,
        offerData: {
          id: 'assdf',
          category: 'Recolector',
          salary: 20,
          extraSalary: 11,
          extras: [
            { name: 'Desplazamiento', amount: 10 },
            { name: 'Cervezas', amount: 30 },
          ],
        },
        eventData: {
          name: 'Recogida de peras',
          location: 'Albacete',
          date: '12 jun',
        },
        companyData: {},
        workerData: {
          name: 'Pablo Peralta',
          images: 'https://avatars.githubusercontent.com/u/43375266?v=4',
          contact: {
            email: 'peral@gmail.com',
            phoneNumber: 485748545,
          },
        },
        contractData: {
          status: 'pending',
          type: 'Temporal',
          salary: 20,
          extraSalary: 11,
          extras: [
            { name: 'Desplazamiento', amount: 10 },
            { name: 'Cervezas', amount: 30 },
          ],
        },
      },
      {
        id: 2,
        offerData: {
          id: 'zBY1vsum9qRBl7iNig3L',
          category: 'Limpiador',
          salary: 20,
          extraSalary: 11,
          extras: [
            { name: 'Desplazamiento', amount: 10 },
            { name: 'Cervezas', amount: 30 },
          ],
        },
        eventData: {
          name: 'Evento de Mercedes',
          location: 'Madrid',
          date: '12 jun',
        },
        companyData: {},
        workerData: {
          name: 'Pablo Peralta',
          images: 'https://avatars.githubusercontent.com/u/43375266?v=4',
          contact: {
            email: 'peral@gmail.com',
            phoneNumber: 485748545,
          },
        },
        contractData: {
          status: 'pending',
          type: 'Temporal',
        },
      },
    ];

    console.log('contracts', contracts);
    dispatch({
      type: FETCH_CONTRACTS,
      contracts: contracts,
    });
  };
};

export const fetchContract = async (offerId) => {

    // const token = getState().auth.token

    const response = await fetch(
      `https://us-central1-partime-60670.cloudfunctions.net/api/contract/${offerId}?type=offer`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok && response.status === 404)
      return null;
    if (!response.ok) throw new Error("Ha ocurrido un error.");

    const link = await response.json()
    
    console.log('el enlace es:',link)
    return link.body;
};

