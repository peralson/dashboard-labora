export const FETCH_PAYROLLS = 'FETCH_PAYROLLS';

export const fetchPayrolls = () => {
  return async (dispatch, getState) => {
    // const token = getState().auth.token

    const response = await fetch(
      'https://us-central1-partime-60670.cloudfunctions.net/api/payroll/company',
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // if (!response.ok && response.status === 404)
    //   return dispatch({ type: FETCH_PAYROLLS, contracts: [] });
    // if (!response.ok) throw new Error("Ha ocurrido un error.");

    const resData = await response.json();

    console.log('redssss', resData);

    let payrolls = [];

    // resData.body.forEach((payroll) => {
    //   payrolls.push(payroll);
    // });

    console.log('payrolls', payrolls);

    payrolls = [
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

    dispatch({
      type: FETCH_PAYROLLS,
      payrolls: payrolls,
    });
  };
};

export const fetchPayroll = async (jobId) => {
  // const token = getState().auth.token

  const response = await fetch(
    `https://us-central1-partime-60670.cloudfunctions.net/api/payroll/${jobId}?type=job`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok && response.status === 404) return null;
  if (!response.ok) throw new Error('Ha ocurrido un error.');

  const link = await response.json();

  console.log('el payrol es:', link);
  return link.body;
};

export const fetchWorkerPayroll = async ({ offerId, userId }) => {
  // const token = getState().auth.token

  const response = await fetch(
    `https://us-central1-partime-60670.cloudfunctions.net/api/payroll/company/${offerId}/${userId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok && response.status === 404) return null;
  if (!response.ok) throw new Error('Ha ocurrido un error.');

  const link = await response.json();

  console.log('el enlace es:', link);
  return link.body;
};
