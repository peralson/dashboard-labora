export const FETCH_COMPANY = "FETCH_COMPANY";
export const EDIT_COMPANY = "EDIT_COMPANY";

export const fetchCompany = () => {
  return async (dispatch, getState) => {
    const token = localStorage.getItem("fbase_key");

    const response = await fetch(
      "https://us-central1-partime-60670.cloudfunctions.net/api/company/myCompany",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const resData = await response.json();

    if (!response.ok) {
      console.error("ERROR", resData);
      throw new Error();
    }

    dispatch({
      type: FETCH_COMPANY,
      company: resData.body,
    });
  };
};

export const editCompany = (state) => {
  return async () => {
    const token = localStorage.getItem("fbase_key");

    console.log({
      id: state.id,
      general: {
        name: state.name,
        photo: state.newPhoto,
      },
      contact: {
        mail: state.mail,
        phoneNumber: state.phoneNumber,
        location: state.location,
      },
    });

    const response = await fetch(
      "https://us-central1-partime-60670.cloudfunctions.net/api/company/",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: state.id,
          general: {
            name: state.name,
            photo: state.newPhoto ? state.newPhoto : null,
          },
          contact: {
            mail: state.mail,
            phoneNumber: state.phoneNumber,
            location: state.location,
          },
        }),
      },
    );

    const resData = await response.json();

    if (!response.ok) {
      console.error("ERROR", resData);
      throw new Error();
    }
  };
};;