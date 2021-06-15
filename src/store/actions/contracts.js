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

    if (!response.ok && response.status === 404)
      return dispatch({ type: FETCH_CONTRACTS, contracts: [] });
    if (!response.ok) throw new Error("Ha ocurrido un error.");

    const resData = await response.json();

    let contracts = [];

    resData.body.forEach((contract) => {
      contracts.push(contract);
    });

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

  if (!response.ok && response.status === 404) return null;
  if (!response.ok) throw new Error('Ha ocurrido un error.');

  const link = await response.json();

  console.log('el enlace es:', link);
  return link.body;
};

export const fetchWorkerContract = async ({ offerId, userId }) => {
  // const token = getState().auth.token

  const response = await fetch(
    `https://us-central1-partime-60670.cloudfunctions.net/api/contract/company/${offerId}/${userId}`,
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
