import sortByDate from '../../lib/sortByDate';

export const FETCH_PROJECTS = 'FETCH_PROJECTS';
export const FETCH_PAST_PROJECTS = 'FETCH_PAST_PROJECTS';
export const CREATE_NEW_PROJECT = 'CREATE_NEW_PROJECT';
export const CREATE_PROJECT_OFFER = 'CREATE_PROJECT_OFFER';
export const CREATE_SOLO_OFFER = 'CREATE_SOLO_OFFER';
export const DELETE_PROJECT = 'DELETE_PROJECT';
export const DELETE_PROJECT_OFFER = 'DELETE_PROJECT_OFFER';
export const EDIT_OFFER = 'EDIT_OFFER';
export const EDIT_SINGLE_OFFER = "EDIT_SINGLE_OFFER";
export const EDIT_PROJECT = 'EDIT_PROJECT';

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

    const response = await fetch(
      'https://us-central1-partime-60670.cloudfunctions.net/api/event/fullEventsHistory',
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

    const sortedDates = newProject.dates.sort(
      (a, b) => a > b ? 1 : -1
    )

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
          dates: sortedDates,
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
          dates: sortedDates.map((date) => ({ _seconds: date / 1000 })),
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

    if (!response.ok && response.status !== 404) {
      console.log('ERROR');
      const resData = await response.json();
      console.error(resData);
      throw new Error('Ha habido un problema...');
    }

    dispatch({
      type: DELETE_PROJECT,
      id: projectId,
    });
  };
};

export const createProjectOffer = (projectId, offerData) => {
  return async (dispatch, getState) => {
    // const token = getState().auth.token

    const response = await fetch(
      'https://us-central1-partime-60670.cloudfunctions.net/api/offer/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
          schedule: formattedSchedule(offerData.schedule),
          qty: offerData.qty,
          contractId: offerData.contractId,
          tags: offerData.tags,
          extras: offerData.extras,
        }),
      }
    );

    if (!response.ok) {
      console.log('ERROR');
      const resData = await response.json();
      console.error(resData);
      throw new Error('Ha habido un problema...');
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

export const deleteProjectOffer = (projectId, offerId) => {
  return async (dispatch, getState) => {
    // const token = getState().auth.token;

    const response = await fetch(
      `https://us-central1-partime-60670.cloudfunctions.net/api/offer/${offerId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      console.log('ERROR');
      const resData = await response.json();
      console.error(resData);
      throw new Error('Ha habido un problema...');
    }

    dispatch({
      type: DELETE_PROJECT_OFFER,
      offerId: offerId,
      projectId: projectId,
    });
  };
};

export const createOfferSingle = ({ offerData, projectData }) => {
  return async (dispatch, getState) => {
    // const token = getState().auth.token

    const sortedDates = 
      formattedDates(projectData.dates)
      .sort((a, b) => a > b ? 1 : -1)

    const sortedSchedule = 
      formattedSchedule(offerData.schedule)
      .sort((a, b) => a.day > b.day ? 1 : -1)

    const response = await fetch(
      'https://us-central1-partime-60670.cloudfunctions.net/api/offer/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: offerData.name,
          category: offerData.category,
          description: offerData.description,
          requirements: {},
          location: offerData.location,
          salary: parseFloat(offerData.salary),
          extraSalary: parseFloat(offerData.extraSalary),
          schedule: sortedSchedule,
          qty: offerData.qty,
          contractId: offerData.contractId,
          tags: offerData.tags,
          extras: offerData.extras,
          projectData: {
            name: null,
            location: projectData.location,
            description: null,
            dates: sortedDates,
          },
        }),
      }
    );

    if (!response.ok) {
      console.log('ERROR');
      const resData = await response.json();
      console.error(resData);
      throw new Error('Ha habido un problema...');
    }

    const resData = await response.json();

    console.log(resData);

    dispatch({
      type: CREATE_SOLO_OFFER,
    });
  };
};

export const editOffer = ({ offerData, projectData }) => {
  return async (dispatch, getState) => {
    const currentProject = getState().projects.allProjects.find(
      (p) => p.id === projectData.id,
    );
    const currentOffer = currentProject.projectOffers.find(
      (offer) => offer.id === offerData.id,
    );

    currentOffer.offerData.name = offerData.name;
    currentOffer.offerData.salary = parseFloat(offerData.salary);
    currentOffer.offerData.description = offerData.description;
    currentOffer.offerData.extraSalary = parseFloat(offerData.extra);
    currentOffer.offerData.qty = parseInt(offerData.qty);

    const response = await fetch(
      "https://us-central1-partime-60670.cloudfunctions.net/api/offer",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: offerData.id,
          name: offerData.name,
          salary: parseFloat(offerData.salary),
          description: offerData.description,
          extraSalary: parseFloat(offerData.extra),
          qty: parseInt(offerData.qty),
        }),
      },
    );

    if (!response.ok) {
      console.log("ERROR");
      const resData = await response.json();
      console.error(resData);
      throw new Error("Ha habido un problema...");
    }

    dispatch({
      type: EDIT_OFFER,
      payload: {
        updatedOffer: currentOffer.offerData,
        projectId: projectData.id,
      },
    });
  };
};

export const editProject = (id, state, dates) => {
  return async (dispatch, getState) => {
    // const token = getState().auth.token

    const response = await fetch(
      "https://us-central1-partime-60670.cloudfunctions.net/api/event",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: id,
          name: state.name,
          description: state.description,
          location: state.location,
          // dates: dates,
        }),
      },
    );

    if (!response.ok) {
      console.log('ERROR');
      const resData = await response.json();
      console.error(resData);
      throw new Error('Ha habido un problema...');
    }

    dispatch({
      type: EDIT_PROJECT,
      id: id,
      projectData: {
        name: state.name,
        description: state.description,
        location: state.location,
        dates: dates,
      }
    })
  }
}

export const editSingleOffer = (project, state) => {
  return async (dispatch, getState) => {
    const offer = project.projectOffers[0];

    const response = await fetch(
      "https://us-central1-partime-60670.cloudfunctions.net/api/offer",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: offer.id,
          name: state.name,
          salary: parseFloat(state.salary),
          description: state.description,
          extraSalary: parseFloat(state.extraSalary),
          qty: parseInt(state.qty),
          projectData: {
            id: project.id,
            name: null,
            description: null,
            location: state.location,
          },
        }),
      },
    );

    if (!response.ok) {
      console.log("ERROR");
      const resData = await response.json();
      console.error(resData);
      throw new Error("Ha habido un problema...");
    }

    dispatch({
      type: EDIT_SINGLE_OFFER,
      payload: {
        projectId: project.id,
        state: state,
      },
    });
  };
};

const formattedSchedule = (schedule) => {
  return schedule.map((sche) => {
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
};

const formattedDates = (dates) => dates.map((date) => date._seconds * 1000);
