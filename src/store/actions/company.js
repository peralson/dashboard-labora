export const FETCH_COMPANY = "FETCH_COMPANY";
export const EDIT_COMPANY = "EDIT_COMPANY";

export const fetchCompany = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.idToken;

    const response = await fetch(
      "https://us-central1-partime-60670.cloudfunctions.net/api/user/company/myCompany",
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
      company: resData.body[0],
    });
  };
};

export const editCompany = (state) => {
  return async (dispatch, getState) => {
    const token = getState().auth.idToken;

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
      "https://us-central1-partime-60670.cloudfunctions.net/api/user/company/",
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
            photo: state.newPhoto ? state.newPhoto.split(";base64,")[1] : null,
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

    console.log(resData);

    // dispatch({
    //   type: EDIT_COMPANY,
    //   payload: {
    //     general: {
    //       name: state.name,
    //       photo: newLogo,
    //     },
    //     contact: {
    //       mail: state.mail,
    //       phoneNumber: state.phoneNumber,
    //       location: state.location,
    //     },
    //   },
    // });
  };
};;