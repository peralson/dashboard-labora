import sortByDate from '../../lib/sortByDate';

export const FETCH_PROJECTS = 'FETCH_PROJECTS';
export const FETCH_PAST_PROJECTS = 'FETCH_PAST_PROJECTS';
export const CREATE_NEW_PROJECT = 'CREATE_NEW_PROJECT';
export const CREATE_PROJECT_OFFER = 'CREATE_PROJECT_OFFER';
export const DELETE_PROJECT = 'DELETE_PROJECT';
export const EDIT_ONE_OFFER = 'EDIT_ONE_OFFER';

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
    // const token = getState().auth.token

    console.log('antes del fetch');

    const response = await fetch(
      'https://us-central1-partime-60670.cloudfunctions.net/api/event/fullEvents',
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok && response.status === 404)
      return dispatch({ type: FETCH_PAST_PROJECTS, pastProjects: [] });
    if (!response.ok) throw new Error('Ha ocurrido un error.');

    let pastProjects = [];
    const resData = await response.json();

    resData.body.forEach((project) => {
      pastProjects.push(project);
    });

    dispatch({
      type: FETCH_PAST_PROJECTS,
      pastProjects: pastProjects,
    });
  };
};

export const createProject = (newProject) => {
  return async (dispatch, getState) => {
    // const token = getState().auth.token;
    // const companyId = getState().auth.id;

    const response = await fetch(
      'https://us-central1-partime-60670.cloudfunctions.net/api/event/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: newProject.name,
          dates: newProject.dates,
          location: {
            address: newProject.location.address,
            lat: newProject.location.lat,
            lng: newProject.location.lng,
          },
          description: newProject.description,
        }),
      }
    );

    if (!response.ok) throw new Error('Ha habido un error en la conexión');

    const resData = await response.json();
    const id = resData.body;

    dispatch({
      type: CREATE_NEW_PROJECT,
      payload: {
        id: id,
        projectData: {
          ...newProject,
          dates: newProject.dates.map((date) => ({ _seconds: date / 1000 })),
          id_company: '2T3NK8AYAphTK3LWTleV9aH8C6G3',
          id: id,
          jobs: 0,
        },
        projectOffers: [],
      },
    });

    return id;
  };
};

export const deleteProject = (projectId) => {
  return async (dispatch, getState) => {
    // const token = getState().auth.token;
    // const companyId = getState().auth.id;

    const response = await fetch(
      `https://us-central1-partime-60670.cloudfunctions.net/api/event/${projectId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) throw new Error();

    dispatch({
      type: DELETE_PROJECT,
      id: projectId,
    });
  };
};

export const createProjectOffer = (projectId, offerData) => {
  return async (dispatch, getState) => {
    console.log(projectId);
    console.log(offerData);
    // const token = getState().auth.token

    const formattedSchedule = offerData.schedule.map((sche) => {
      const day = sche.day._seconds * 1000;
      let shifts = [];
      sche.shifts.forEach((shift) => {
        shifts.push({
          start: shift.start._seconds * 1000,
          end: shift.end._seconds * 1000,
        });
      });
      return {
        day,
        shifts,
      };
    });

    const response = await fetch(
      "https://us-central1-partime-60670.cloudfunctions.net/api/offer/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id_event: projectId,
          name: offerData.name,
          category: offerData.category,
          description: offerData.description,
          requirements: {},
          location: offerData.location,
          salary: offerData.salary,
          extraSalary: offerData.extraSalary,
          schedule: formattedSchedule,
          qty: offerData.qty,
          contractId: offerData.contractId,
          tags: offerData.tags,
          extras: offerData.extras,
        }),
      },
    );

    if (!response.ok) {
      console.log("ERROR");
      const resData = await response.json();
      console.error(resData);
      throw new Error("Ha habido un problema...");
    }

    const resData = await response.json();
    const offerId = resData.body;

    console.log(resData);

    dispatch({
      type: CREATE_PROJECT_OFFER,
      projectId,
      offerId,
      data: {
        id: offerId,
        id_event: projectId,
        name: offerData.name,
        category: offerData.category,
        description: offerData.description,
        requirements: {},
        location: offerData.location,
        salary: offerData.salary,
        extraSalary: offerData.extraSalary,
        schedule: offerData.schedule,
        qty: offerData.qty,
        contractId: offerData.contractId,
        tags: offerData.tags,
        extras: offerData.extras,
        already_assigned: 0,
        jobs: 0,
        number_applies: 0,
      },
    });
  };
};

export const createOfferSingle = (data) => {
  return async (dispatch, getState) => {
    console.log(data);
  };
};

export const editOffer = (
  projectId,
  offerId,
  name,
  category,
  salary,
  extra,
  qty,
  description
) => {
  return async (dispatch, getState) => {
    // const currentProject = getState().projects.find((p) => p.id === projectId);
    // const currentOffer = currentProject.projectOffers.find(
    //   (offer) => offer.id === offerId
    // );
    // console.log('currentOffer:', currentOffer);
  };
};
