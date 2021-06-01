import sortByDate from '../../lib/sortByDate';

export const FETCH_PROJECTS = 'FETCH_PROJECTS';
export const FETCH_PAST_PROJECTS = 'FETCH_PAST_PROJECTS';
export const CREATE_NEW_PROJECT = "CREATE_NEW_PROJECT";

export const fetchProjects = () => {
  return async (dispatch, getState) => {
    // const token = getState().auth.token

    const response = await fetch(
      'https://us-central1-partime-60670.cloudfunctions.net/api/event/fullEvents',
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok && response.status === 404)
      return dispatch({ type: FETCH_PROJECTS, projects: [] });
    if (!response.ok) throw new Error('Ha ocurrido un error.');

    let projects = [];
    const resData = await response.json();

    resData.body.forEach((project) => {
      projects.push(project);
    });

    const projectsSortByDate = sortByDate(projects);

    dispatch({
      type: FETCH_PROJECTS,
      projects: projectsSortByDate,
    });
  };
};

export const fetchPastProjects = () => {
  return async (dispatch, getState) => {
    let pastProjects = [];

    pastProjects.push(
      {
        id: 1,
        name: 'Caja Mágica',
        direction: 'Madrid',
        date: '25-may - 1jun',
        workers: 35,
        cost: 1537,
        status: 'finished',
        offers: [
          {
            id: 1,
            name: 'Camarero de barra',
            hours: 12,
            cost: 600,
          },
          {
            id: 1,
            name: 'Camarero de barra',
            hours: 12,
            cost: 600,
          },
          {
            id: 1,
            name: 'Limpieza',
            hours: 12,
            cost: 300,
          },
        ],
      },
      {
        id: 3,
        name: 'Catering',
        direction: 'Córdoba',
        date: '18jun',
        workers: 4,
        cost: 200,
        status: 'finished',
        offers: [
          {
            id: 1,
            name: 'Camarero de barra',
            hours: 12,
            cost: 600,
          },
          {
            id: 1,
            name: 'Camarero de barra',
            hours: 12,
            cost: 600,
          },
        ],
      }
    );

    pastProjects.push(
      {
        id: 2,
        name: 'Boda Gómez',
        direction: 'Alcalá',
        date: '22-may - 3jun',
        workers: 3,
        cost: 132,
        status: 'finished',
        offers: [
          {
            id: 1,
            name: 'Camarero de barra',
            hours: 12,
            cost: 600,
          },
        ],
      },
    );

    pastProjects.push(
      {
        id: 3,
        name: 'Catering',
        direction: 'Córdoba',
        date: '18jun',
        workers: 4,
        cost: 200,
        status: 'finished',
        offers: [
          {
            id: 1,
            name: 'Camarero de barra',
            hours: 12,
            cost: 600,
          },
          {
            id: 1,
            name: 'Camarero de barra',
            hours: 12,
            cost: 600,
          },
        ],
      }
    );

    dispatch({
      type: FETCH_PAST_PROJECTS,
      pastProjects: pastProjects,
    });
  };
};

export const createProject = (newProject) => {
  return async (dispatch, getState) => {
    dispatch({
      type: CREATE_NEW_PROJECT,
      id: "lalala",
    });
  };
};
