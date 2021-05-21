export const FETCH_WORKERS = 'FETCH_WORKERS';

export const fetchWorkers = () => {
  return async (dispatch, getState) => {
    const workers = [
      {
        id: 1,
        name: 'Eloy',
        email: 'eloy@gmail.com',
        image: 'https://bit.ly/sage-adebayo',
        phone: 77777,
        categories: ['camarero'],
        tags: ['gafas', 'alto', 'delgado', 'moreno'],
        works: [
          {
            name: 'Bar Manolito',
            date: '12-5-21',
            nomina: 'pdf',
            contrato: 'pdf',
          },
          {
            name: 'La Contentura',
            date: '27-3-21',
            nomina: 'pdf',
            contrato: 'pdf',
          },
        ],
      },
      {
        id: 2,
        name: 'Peralta',
        email: 'peralson@gmail.com',
        image: 'https://bit.ly/dan-abramov',
        phone: 9999,
        categories: ['limpiador'],
        tags: ['moreno', 'delgado'],
        works: [
          {
            name: 'Fiesta fin de curso',
            date: '12-5-21',
            nomina: 'pdf',
            contrato: 'pdf',
          },
        ],
      },
      {
        id: 3,
        name: 'Martino',
        email: 'mpal@mail.com',
        image:
          'https://concepto.de/wp-content/uploads/2018/08/persona-e1533759204552.jpg',
        phone: 5459,
        categories: ['conserje'],
        tags: ['rubio', 'delgado'],
      },
      {
        id: 5,
        name: 'Peralta',
        email: 'pe@ail.com',
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHlIC6mj9KXGnVloMBpbZ5MULyumav2TarjA&usqp=CAU',
        phone: 4434399,
        categories: ['camarero'],
        tags: ['moreno', 'delgado'],
        works: [
          {
            name: 'Limpieza Hospital',
            date: '12-5-21',
            nomina: 'pdf',
            contrato: 'pdf',
          },
          {
            name: 'Entrega premios',
            date: '26-4-21',
            nomina: 'pdf',
            contrato: 'pdf',
          },
          {
            name: 'Reparto comida',
            date: '5-3-21',
            nomina: 'pdf',
            contrato: 'pdf',
          },
        ],
      },
    ];

    dispatch({
      type: FETCH_WORKERS,
      workers: workers,
    });
  };
};
