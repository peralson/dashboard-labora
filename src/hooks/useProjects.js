const useProjects = () => {
  const projects = [
    {
      id: '1',
      projectData: {
        name: 'Fiesta de fin de curso',
        dates: {
          start: { _seconds: 190000000 },
          end: { _seconds: 190000000 },
        },
        location: {
          address: 'Poeta Alonso de Bonilla 19, 14012, Córdoba, España',
          lat: 40.2415267,
          lng: -1.6724511,
        },
      },
      projectOffers: [
        {
          id: '1',
          offerData: {
            name: 'Barra del fondo',
            category: 'Camarero',
            salary: 12.3,
            extraSalary: 15,
            already_assigned: 2,
          },
          offerApplications: [
            {
              id: 1,
              workerData: {
                name: 'Pablo Peralta',
                bio: 'Hola que tal',
                images: {
                  main: '',
                  professional: '',
                },
                birthDay: { _seconds: 190000000 },
                gender: 'male',
                totalHours: 10,
                contact: {
                  phoneNumber: '607570778',
                  email: 'pabloperaltapalacios@gmail.com',
                  location: {
                    address: 'Poeta Paredes 50, Córdoba',
                  },
                },
                transport: {
                  hasCar: true,
                  hasLicense: true,
                  license: {
                    type: ['A', 'B'],
                  },
                },
                workerJobHistory: [
                  {
                    id: '1',
                    jobHistoryData: {
                      eventName: 'Fiesta anterior',
                      companyName: 'Clapfy',
                      offerName: 'Barra del principio',
                      dates: { _seconds: 190000000 },
                      hours: 10,
                    },
                  },
                ],
              },
            },
          ],
        },
      ],
    },
    {
      id: '2',
      projectData: {
        name: 'Fiesta de fin de curso',
        dates: {
          start: { _seconds: 190000000 },
          end: { _seconds: 190000000 },
        },
        location: {
          address: 'Poeta Alonso de Bonilla 19, 14012, Córdoba, España',
          lat: 40.2415267,
          lng: -1.6724511,
        },
      },
      projectOffers: [
        {
          id: '1',
          offerData: {
            name: 'Barra del fondo',
            category: 'Camarero',
            salary: 12.3,
            extraSalary: 15,
            already_assigned: 2,
          },
          offerApplications: [
            {
              id: 1,
              workerData: {
                name: 'Pablo Peralta',
                bio: 'Hola que tal',
                images: {
                  main: '',
                  professional: '',
                },
                birthDay: { _seconds: 190000000 },
                gender: 'male',
                totalHours: 10,
                contact: {
                  phoneNumber: '607570778',
                  email: 'pabloperaltapalacios@gmail.com',
                  location: {
                    address: 'Poeta Paredes 50, Córdoba',
                  },
                },
                transport: {
                  hasCar: true,
                  hasLicense: true,
                  license: {
                    type: ['A', 'B'],
                  },
                },
                workerJobHistory: [
                  {
                    id: '1',
                    jobHistoryData: {
                      eventName: 'Fiesta anterior',
                      companyName: 'Clapfy',
                      offerName: 'Barra del principio',
                      dates: { _seconds: 190000000 },
                      hours: 10,
                    },
                  },
                ],
              },
            },
          ],
        },
      ],
    },
    {
      id: '3',
      projectData: {
        name: null,
        dates: {
          start: { _seconds: 190000000 },
          end: { _seconds: 190000000 },
        },
        location: {
          address: 'Poeta Alonso de Bonilla 19, 14012, Córdoba, España',
          lat: 40.2415267,
          lng: -1.6724511,
        },
      },
      projectOffers: [
        {
          id: '1',
          offerData: {
            name: 'Barra del fondo',
            category: 'Camarero',
            salary: 12.3,
            extraSalary: 15,
            already_assigned: 2,
          },
          offerApplications: [
            {
              id: 1,
              workerData: {
                name: 'Pablo Peralta',
                bio: 'Hola que tal',
                images: {
                  main: '',
                  professional: '',
                },
                birthDay: { _seconds: 190000000 },
                gender: 'male',
                totalHours: 10,
                contact: {
                  phoneNumber: '607570778',
                  email: 'pabloperaltapalacios@gmail.com',
                  location: {
                    address: 'Poeta Paredes 50, Córdoba',
                  },
                },
                transport: {
                  hasCar: true,
                  hasLicense: true,
                  license: {
                    type: ['A', 'B'],
                  },
                },
                workerJobHistory: [
                  {
                    id: '1',
                    jobHistoryData: {
                      eventName: 'Fiesta anterior',
                      companyName: 'Clapfy',
                      offerName: 'Barra del principio',
                      dates: { _seconds: 190000000 },
                      hours: 10,
                    },
                  },
                ],
              },
            },
          ],
        },
      ],
    },
  ];
  return projects;
};

export default useProjects;
