// Lib
import moment from "moment";
import "moment/locale/es";

export const FETCH_MANAGED_PROJECT = "FETCH_MANAGED_PROJECT";
export const CHANGE_OFFER = "CHANGE_OFFER";
export const CHANGE_DATE = "CHANGE_DATE";

export const fetchManagedProject = (projectId) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://us-central1-partime-60670.cloudfunctions.net/api/event/checkStatus/${projectId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const resData = await response.json();

    if (!response.ok && response.status === 404)
      return dispatch({ type: FETCH_MANAGED_PROJECT, projects: {} });
    if (!response.ok) {
      console.error("ERROR", resData);
      throw new Error("Ha ocurrido un error.");
    }

    dispatch({
      type: FETCH_MANAGED_PROJECT,
      managedProject: resData.body,
      offersArray: getArrayOfOffers(resData.body.proyectOffers),
      datesArray: getArrayOfDates(resData.body.projectData.dates),
      jobs: getAllJobs(resData.body.proyectOffers),
    });
  };
};

export const handleChangeOffer = (offer) => {
  return async (dispatch) => {
    dispatch({
      type: CHANGE_OFFER,
      offer: offer,
    });
  };
}

export const handleChangeDate = (date) => {
  return async (dispatch) => {
    dispatch({
      type: CHANGE_DATE,
      date: date,
    });
  };
}

const getArrayOfDates = (dates) => {
  const array = [];
  dates.forEach((date) => {
    array.push(moment(date._seconds * 1000).format("dddd, D MMMM"));
  });
  return array;
};

const getArrayOfOffers = (offers) => {
  const array = [];
  offers.forEach((offer) => {
    array.push(offer.offerData.name);
  });
  return array;
};

const getAllJobs = (offers) => {
  const array = [];
  offers.forEach((offer) => {
    const offerName = offer.offerData.name;
    offer.offerData.schedule.forEach((sche) => {
      const day = moment(sche.day._seconds * 1000).format("dddd, D MMMM");;
      offer.offerJobs.forEach((job) => {
        array.push({
          id: job.id,
          day: day,
          offer: offerName,
          name: job.workerData.name,
          image: job.workerData.images.main,
          status: job.status,
          check_in: job.check_in,
          check_out: job.check_out,
          phoneNumber: 607570778
        });
      });
    }); 
  });
  return array;
};
