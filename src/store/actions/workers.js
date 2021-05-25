export const FETCH_WORKERS = 'FETCH_WORKERS';

export const fetchWorkers = () => {
  return async (dispatch, getState) => {
    // const response = await fetch(
    //   'https://us-central1-partime-60670.cloudfunctions.net/api/listOfWorkers/myWorkers',
    //   {
    //     headers: {
    //       'Access-Control-Allow-Origin': '*',
    //       'Content-Type': 'application/json',
    //       'Access-Control-Allow-Headers':
    //         'Origin, X-Requested-With, Content-Type, Accept',
    //     },
    //   }
    // );

    // if (!response.ok && response.status === 404)
    //   return dispatch({ type: FETCH_WORKERS, workers: [] });
    // if (!response.ok) throw new Error('Ha ocurrido un error.');

    let workers = [];
    
    // const resData = await response.json();

    // resData.body.forEach(worker => {
    //   workers.push(worker)
    // })

    // Push de workers porque server error 500
    workers.push(
      {
        id: 1,
        categories: ['camarero'],
        history:[{
          data: {
            category: 'Azafatas',
            companyName: 'SpaceX',
            eventName: 'Aniversario',
            offerName: 'Premios',
          }
        }],
        tags: ['gafas', 'alto', 'delgado', 'moreno'],
        workerData:{
          images: {
            main: 'https://bit.ly/sage-adebayo',
            profesional: 'https://bit.ly/sage-adebayo'
          },
          name: 'Eloy',
        }
      },
      {
        id: 2,
        categories: ['camarero', 'limpiador'],
        history:[{
          data: {
            category: 'Azafatas',
            companyName: 'SpaceX',
            eventName: 'Aniversario',
            offerName: 'Premios',
          }
        }],
        tags: ['bajo', 'rubio', 'fuerte', 'moreno'],
        workerData:{
          images: {
            main: 'https://bit.ly/sage-adebayo',
            profesional: 'https://bit.ly/sage-adebayo'
          },
          name: 'Martino',
        }
      }
    )
    
    console.log(workers)
    
    dispatch({
      type: FETCH_WORKERS,
      workers: workers,
    });
  };
};
